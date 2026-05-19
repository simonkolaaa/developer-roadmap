import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { prompt } = await request.json();
    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
      });
    }

    const getEnv = (key: string) => {
      // @ts-ignore
      if (typeof process !== 'undefined' && process.env && process.env[key]) {
        // @ts-ignore
        return process.env[key];
      }
      // @ts-ignore
      return import.meta.env[key];
    };

    const apiKey = getEnv('GEMINI_API_KEY');
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: 'GEMINI_API_KEY not configured. Assicurati di averla inserita su Vercel (e di aver fatto Redeploy).',
        }),
        { status: 500 },
      );
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemma-4-31b-it:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Sei un esperto sviluppatore e architetto software. Genera ESCLUSIVAMENTE un diagramma Mermaid JS (flowchart TD) che rappresenti una roadmap logica e sequenziale per imparare: ${prompt}.
Il diagramma deve avere almeno 8-10 nodi con i concetti fondamentali e le relative connessioni. 
Regole ferree:
1. Usa solo la sintassi di Mermaid (es. flowchart TD, A[Start] --> B[Next]).
2. Metti il codice Mermaid SEMPRE all'interno di un blocco markdown con i backtick (\`\`\`mermaid e \`\`\`). Questo è obbligatorio per l'estrazione.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.3,
          },
        }),
      },
    );

    const data = await response.json();
    if (!response.ok) {
      console.error(data);
      return new Response(
        JSON.stringify({ error: `Gemini API Error: ${data.error?.message || JSON.stringify(data)}` }),
        { status: 500 },
      );
    }

    let text = data.candidates[0].content.parts[0].text;

    // Advanced Mermaid code extraction
    const mermaidMatch = text.match(/```(?:mermaid)?\n?([\s\S]*?)```/);
    if (mermaidMatch && mermaidMatch[1]) {
      text = mermaidMatch[1].trim();
    } else {
      // Fallback: try to find the start of the flowchart/graph if backticks are missing
      const lines = text.split('\n');
      const diagramLines = [];
      let capturing = false;
      for (const line of lines) {
        if (line.trim().toLowerCase().startsWith('flowchart') || line.trim().toLowerCase().startsWith('graph')) {
          capturing = true;
        }
        if (capturing) {
          // Se la riga sembra testo discorsivo o un elenco puntato che non c'entra con mermaid, interrompi.
          if (
            (line.trim().startsWith('*') || line.trim().startsWith('-')) && 
            !line.includes('-->') && 
            !line.includes('---') && 
            !line.match(/[\[\]{()}]/)
          ) {
            break;
          }
          diagramLines.push(line);
        }
      }
      if (diagramLines.length > 0) {
        text = diagramLines.join('\n').trim();
      }
    }

    if (!text.toLowerCase().startsWith('flowchart') && !text.toLowerCase().startsWith('graph')) {
      text = 'flowchart TD\n' + text;
    }

    return new Response(JSON.stringify({ diagram: text }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};
