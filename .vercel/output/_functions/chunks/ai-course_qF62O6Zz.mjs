import { jsx } from 'react/jsx-runtime';
import Cookies from 'js-cookie';
import { e as httpPost, h as httpGet$1 } from './BaseLayout_DetAB5fP.mjs';
import { i as isLoggedIn, T as TOKEN_COOKIE_NAME, g as getUser } from './jwt_ZAvcheRY.mjs';
import { atom, computed } from 'nanostores';
import { q as queryClient } from './query-client_Cw7dV90V.mjs';
import { queryOptions } from '@tanstack/react-query';
import { h as httpGet } from './query-http_Ba7FoUiV.mjs';

function GitHubIcon(props) {
  const { className } = props;
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className: className || "",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 98 96",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fillRule: "evenodd",
          d: "M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362l-.08-9.127c-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126l-.08 13.526c0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z",
          fill: className?.indexOf("text-") !== -1 ? "currentColor" : "#24292f"
        }
      )
    }
  );
}

const currentRoadmap = atom(void 0);
computed(
  currentRoadmap,
  (roadmap) => !roadmap?.teamId
);
computed(
  currentRoadmap,
  (roadmap) => roadmap?.canManage
);
const roadmapProgress = atom();
const totalRoadmapNodes = atom();

function userResourceProgressOptions(resourceType, resourceId) {
  return queryOptions({
    queryKey: ["resource-progress", resourceId, resourceType],
    queryFn: () => {
      return httpGet(
        `/v1-get-user-resource-progress`,
        {
          resourceId,
          resourceType
        }
      );
    },
    enabled: !!isLoggedIn(),
    refetchOnMount: false
  });
}

async function isTopicDone(topic) {
  const { topicId, resourceType, resourceId } = topic;
  const { done = [] } = await getResourceProgress(resourceType, resourceId) || {};
  return done?.includes(topicId);
}
async function getTopicStatus(topic) {
  const { topicId, resourceType, resourceId } = topic;
  const progressResult = await getResourceProgress(resourceType, resourceId);
  if (progressResult?.done?.includes(topicId)) {
    return "done";
  }
  if (progressResult?.learning?.includes(topicId)) {
    return "learning";
  }
  if (progressResult?.skipped?.includes(topicId)) {
    return "skipped";
  }
  return "pending";
}
async function updateResourceProgress(topic, progressType) {
  const { topicId, resourceType, resourceId } = topic;
  const { response, error } = await httpPost(`${undefined                              }/v1-update-resource-progress`, {
    topicId,
    resourceType,
    resourceId,
    progress: progressType
  });
  if (error || !response?.done || !response?.learning) {
    throw new Error(error?.message || "Something went wrong");
  }
  roadmapProgress.set({
    done: response.done,
    learning: response.learning,
    skipped: response.skipped,
    personalized: response.personalized
  });
  queryClient.setQueryData(
    userResourceProgressOptions(resourceType, resourceId).queryKey,
    (oldData) => {
      if (!oldData) {
        return void 0;
      }
      return {
        ...oldData,
        done: response.done,
        learning: response.learning,
        skipped: response.skipped
      };
    }
  );
  return response;
}
function clearMigratedRoadmapProgress(resourceType, resourceId) {
  const migratedRoadmaps = [
    "frontend",
    "backend",
    "devops",
    "data-analyst",
    "android",
    "full-stack",
    "ai-data-scientist",
    "postgresql-dba",
    "blockchain",
    "qa",
    "software-architect",
    "cyber-security",
    "ux-design",
    "game-developer",
    "server-side-game-developer",
    "technical-writer",
    "mlops",
    "computer-science",
    "react",
    "vue",
    "javascript",
    "angular",
    "nodejs",
    "typescript",
    "python",
    "sql",
    "system-design",
    "aspnet-core",
    "java",
    "cpp",
    "docker",
    "prompt-engineering",
    "aws",
    "datastructures-and-algorithms",
    "kubernetes",
    "linux",
    "software-design-architecture",
    "rust",
    "react-native",
    "graphql",
    "spring-boot",
    "mongodb",
    "flutter",
    "design-system",
    "golang"
  ];
  if (!migratedRoadmaps.includes(resourceId)) {
    return;
  }
  const userId = getUser()?.id;
  if (!userId) {
    return;
  }
  const roadmapKey = `${resourceType}-${resourceId}-${userId}-progress`;
  const clearedKey = `${resourceType}-${resourceId}-${userId}-cleared`;
  const clearedCount = parseInt(localStorage.getItem(clearedKey) || "0", 10);
  if (clearedCount >= 10) {
    return;
  }
  localStorage.removeItem(roadmapKey);
  localStorage.setItem(clearedKey, `${clearedCount + 1}`);
}
async function getResourceProgress(resourceType, resourceId) {
  if (!Cookies.get(TOKEN_COOKIE_NAME)) {
    return {
      done: [],
      learning: [],
      skipped: [],
      personalized: {
        topicIds: [],
        information: ""
      }
    };
  }
  const { response, error } = await httpGet$1(`${undefined                              }/v1-get-user-resource-progress`, {
    resourceType,
    resourceId
  });
  if (error || !response) {
    console.error(error);
    return {
      done: [],
      learning: [],
      skipped: [],
      personalized: {
        topicIds: [],
        information: ""
      }
    };
  }
  roadmapProgress.set({
    done: response.done,
    learning: response.learning,
    skipped: response.skipped,
    personalized: response.personalized
  });
  window.dispatchEvent(
    new CustomEvent("mark-favorite", {
      detail: {
        resourceType,
        resourceId,
        isFavorite: response.isFavorite
      }
    })
  );
  return response;
}
function topicSelectorAll(topicId, parentElement = document) {
  const matchingElements = [];
  parentElement.querySelectorAll(`[data-group-id$="-${topicId}"]`).forEach((element) => {
    const foundGroupId = element?.dataset?.groupId || "";
    const validGroupRegex = new RegExp(`^\\d+-${topicId}$`);
    if (validGroupRegex.test(foundGroupId)) {
      matchingElements.push(element);
    }
  });
  getMatchingElements(
    [
      `[data-group-id="${topicId}"]`,
      // Elements with exact match of the topic id
      `[data-group-id="check:${topicId}"]`,
      // Matching "check:XXXX" box of the topic
      `[data-node-id="${topicId}"]`,
      // Matching custom roadmap nodes
      `[data-id="${topicId}"]`,
      // Matching custom roadmap nodes
      `[data-checklist-checkbox][data-checklist-id="${topicId}"]`,
      // Matching checklist checkboxes
      `[data-checklist-label][data-checklist-id="${topicId}"]`
      // Matching checklist labels
    ],
    parentElement
  ).forEach((element) => {
    matchingElements.push(element);
  });
  return matchingElements;
}
function renderTopicProgress(topicId, topicProgress) {
  const isLearning = topicProgress === "learning";
  const isSkipped = topicProgress === "skipped";
  const isDone = topicProgress === "done";
  const isRemoved = topicProgress === "removed";
  const matchingElements = topicSelectorAll(topicId);
  matchingElements.forEach((element) => {
    if (isDone) {
      element.classList.add("done");
      element.classList.remove("learning", "skipped");
    } else if (isLearning) {
      element.classList.add("learning");
      element.classList.remove("done", "skipped");
    } else if (isSkipped) {
      element.classList.add("skipped");
      element.classList.remove("done", "learning");
    } else if (isRemoved) {
      element.classList.add("removed");
      element.classList.remove("done", "learning", "skipped");
    } else {
      element.classList.remove("done", "skipped", "learning", "removed");
    }
  });
}
async function renderResourceProgress(resourceType, resourceId) {
  const {
    done = [],
    learning = [],
    skipped = [],
    personalized = {
      topicIds: [],
      information: ""
    }
  } = await getResourceProgress(resourceType, resourceId) || {};
  done.forEach((topicId) => {
    renderTopicProgress(topicId, "done");
  });
  learning.forEach((topicId) => {
    renderTopicProgress(topicId, "learning");
  });
  skipped.forEach((topicId) => {
    renderTopicProgress(topicId, "skipped");
  });
  personalized.topicIds.forEach((topicId) => {
    renderTopicProgress(topicId, "skipped");
  });
  refreshProgressCounters();
}
function getMatchingElements(queries, parentElement = document) {
  const matchingElements = [];
  queries.forEach((query) => {
    parentElement.querySelectorAll(query).forEach((element) => {
      matchingElements.push(element);
    });
  });
  return matchingElements;
}
function refreshProgressCounters() {
  const progressNumsContainers = document.querySelectorAll(
    "[data-progress-nums-container]"
  );
  const progressNums = document.querySelectorAll("[data-progress-nums]");
  if (progressNumsContainers.length === 0 || progressNums.length === 0) {
    return;
  }
  const totalClickable = getMatchingElements([
    ".clickable-group",
    '[data-type="todo"]',
    '[data-type="topic"]',
    '[data-type="checklist-item"]',
    '[data-type="subtopic"]',
    ".react-flow__node-topic",
    ".react-flow__node-subtopic"
  ]).length;
  const externalLinks = document.querySelectorAll(
    '[data-group-id^="ext_link:"]'
  ).length;
  const roadmapSwitchers = document.querySelectorAll(
    '[data-group-id^="json:"]'
  ).length;
  const checkBoxes = document.querySelectorAll(
    '[data-group-id^="check:"]'
  ).length;
  const totalCheckBoxesDone = document.querySelectorAll(
    '[data-group-id^="check:"].done'
  ).length;
  const totalCheckBoxes2Done = document.querySelectorAll(
    '[data-type="todo-checkbox"].done'
  ).length;
  const totalCheckBoxesLearning = document.querySelectorAll(
    '[data-group-id^="check:"].learning'
  ).length;
  const totalCheckBoxesSkipped = document.querySelectorAll(
    '[data-group-id^="check:"].skipped'
  ).length;
  const totalRemoved = document.querySelectorAll(
    ".clickable-group.removed"
  ).length;
  const totalItems = totalClickable - externalLinks - roadmapSwitchers - checkBoxes - totalRemoved;
  totalRoadmapNodes.set(totalItems);
  const totalDone = getMatchingElements([
    '.clickable-group.done:not([data-group-id^="ext_link:"])',
    "[data-node-id].done",
    // All data-node-id=*.done elements are custom roadmap nodes
    "[data-id].done"
    // All data-id=*.done elements are custom roadmap nodes
  ]).length - totalCheckBoxesDone - totalCheckBoxes2Done;
  const totalLearning = getMatchingElements([
    ".clickable-group.learning",
    "[data-node-id].learning",
    "[data-id].learning"
  ]).length - totalCheckBoxesLearning;
  const totalSkipped = getMatchingElements([
    ".clickable-group.skipped",
    "[data-node-id].skipped",
    "[data-id].skipped"
  ]).length - totalCheckBoxesSkipped;
  const doneCountEls = document.querySelectorAll("[data-progress-done]");
  if (doneCountEls.length > 0) {
    doneCountEls.forEach((doneCountEl) => {
      doneCountEl.innerHTML = `${totalDone + totalSkipped}`;
    });
  }
  const learningCountEls = document.querySelectorAll(
    "[data-progress-learning]"
  );
  if (learningCountEls.length > 0) {
    learningCountEls.forEach(
      (learningCountEl) => learningCountEl.innerHTML = `${totalLearning}`
    );
  }
  const skippedCountEls = document.querySelectorAll("[data-progress-skipped]");
  if (skippedCountEls.length > 0) {
    skippedCountEls.forEach(
      (skippedCountEl) => skippedCountEl.innerHTML = `${totalSkipped}`
    );
  }
  const totalCountEls = document.querySelectorAll("[data-progress-total]");
  if (totalCountEls.length > 0) {
    totalCountEls.forEach(
      (totalCountEl) => totalCountEl.innerHTML = `${totalItems}`
    );
  }
  const progressPercentage = Math.round((totalDone + totalSkipped) / totalItems * 100) || 0;
  const progressPercentageEls = document.querySelectorAll(
    "[data-progress-percentage]"
  );
  if (progressPercentageEls.length > 0) {
    progressPercentageEls.forEach(
      (progressPercentageEl) => progressPercentageEl.innerHTML = `${progressPercentage}`
    );
  }
  progressNumsContainers.forEach(
    (progressNumsContainer) => progressNumsContainer.classList.remove("striped-loader")
  );
  progressNums.forEach((progressNum) => {
    progressNum.classList.remove("opacity-0");
  });
}

function aiLimitOptions() {
  return queryOptions({
    queryKey: ["ai-course-limit"],
    queryFn: () => {
      return httpGet(`/v1-get-ai-course-limit`);
    },
    enabled: !!isLoggedIn(),
    retryOnMount: false,
    refetchOnMount: false
  });
}

export { GitHubIcon as G, renderResourceProgress as a, renderTopicProgress as b, refreshProgressCounters as c, userResourceProgressOptions as d, aiLimitOptions as e, clearMigratedRoadmapProgress as f, getTopicStatus as g, isTopicDone as i, roadmapProgress as r, totalRoadmapNodes as t, updateResourceProgress as u };
