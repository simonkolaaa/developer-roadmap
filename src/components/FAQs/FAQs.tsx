import { useState } from 'react';
import type { OfficialRoadmapQuestion } from '../../queries/official-roadmap';
import { Question } from './Question';
import { guideRenderer } from '../../lib/guide-renderer';

type FAQsProps = {
  faqs: OfficialRoadmapQuestion[];
};

export function FAQs(props: FAQsProps) {
  const { faqs } = props;
  if (faqs.length === 0) {
    return null;
  }

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  return (
    <div className="mt-8 border-t border-slate-800 bg-slate-950">
      <div className="container">
        <div className="relative -top-5 flex justify-between">
          <h2 className="rounded-md border border-slate-700 bg-slate-900 px-3 py-1 text-sm font-medium sm:text-base text-slate-100 font-orbitron">
            Frequently Asked Questions
          </h2>
        </div>


        <div className="flex flex-col gap-1 pb-14">
          {faqs.map((faq, questionIndex) => {
            const isTextDescription =
              typeof faq?.description === 'string' &&
              faq?.description?.length > 0;

            return (
              <Question
                key={faq._id}
                isActive={questionIndex === activeQuestionIndex}
                question={faq.title}
                onClick={() => setActiveQuestionIndex(questionIndex)}
              >
                <div
                  className="text-md rounded-br-md rounded-bl-md border-t border-t-slate-800 bg-slate-900 p-2 text-left text-sm leading-relaxed text-slate-300 sm:p-4 sm:text-base [&>p:not(:last-child)]:mb-3 [&>p>a]:text-blue-400 [&>p>a]:underline"

                  {...(isTextDescription
                    ? {
                        dangerouslySetInnerHTML: {
                          __html: faq.description,
                        },
                      }
                    : {})}
                >
                  {!isTextDescription
                    ? guideRenderer.render(faq.description)
                    : null}
                </div>
              </Question>
            );
          })}
        </div>
      </div>
    </div>
  );
}
