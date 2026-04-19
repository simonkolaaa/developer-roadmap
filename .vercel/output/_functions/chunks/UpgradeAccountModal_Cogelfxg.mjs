import { jsx, jsxs } from 'react/jsx-runtime';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Loader2Icon, Loader2, X, Crown, Zap, MessageCircleIcon, Archive, Map } from 'lucide-react';
import { useState, useEffect } from 'react';
import { u as useToast } from './use-toast_BT3OoCi0.mjs';
import { g as getUser } from './jwt_ZAvcheRY.mjs';
import { a as httpPost } from './query-http_Ba7FoUiV.mjs';
import { V as VerifyUpgrade, b as billingDetailsOptions, U as USER_SUBSCRIPTION_PLAN_PRICES } from './VerifyUpgrade_DAgm5ZaN.mjs';
import { q as queryClient, M as Modal } from './query-client_Cw7dV90V.mjs';

function UpdatePlanConfirmation(props) {
  const { planDetails, onClose, onCancel } = props;
  const toast = useToast();
  const {
    mutate: updatePlan,
    isPending,
    status
  } = useMutation(
    {
      mutationFn: (body) => {
        return httpPost(
          "/v1-update-subscription-plan",
          body
        );
      },
      onError: (error) => {
        console.error(error);
        toast.error(error?.message || "Failed to Create Customer Portal");
      }
    },
    queryClient
  );
  if (!planDetails) {
    return null;
  }
  const selectedPrice = planDetails;
  if (status === "success") {
    return /* @__PURE__ */ jsx(VerifyUpgrade, { newPriceId: selectedPrice.priceId });
  }
  return /* @__PURE__ */ jsxs(
    Modal,
    {
      onClose: isPending ? () => {
      } : onClose,
      bodyClassName: "rounded-xl bg-white p-6",
      children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-black", children: "Subscription Update" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-balance text-gray-600", children: [
          "Your plan will be updated to the",
          " ",
          /* @__PURE__ */ jsx("b", { className: "text-black", children: planDetails.interval }),
          " plan, and will be charged",
          " ",
          /* @__PURE__ */ jsxs("b", { className: "text-black", children: [
            "$",
            selectedPrice.amount,
            "/",
            selectedPrice.interval
          ] }),
          "."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "rounded-md border border-gray-200 py-2 text-sm font-semibold transition-colors hover:bg-gray-50 disabled:opacity-50",
              onClick: onCancel,
              disabled: isPending,
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              className: "flex items-center justify-center rounded-md bg-purple-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500 disabled:opacity-50",
              disabled: isPending,
              onClick: () => {
                updatePlan({ priceId: selectedPrice.priceId });
              },
              children: [
                isPending && /* @__PURE__ */ jsx(Loader2Icon, { className: "mr-2 size-4 animate-spin stroke-[2.5]" }),
                !isPending && "Confirm"
              ]
            }
          )
        ] })
      ]
    }
  );
}

const PREMIUM_PERKS = [
  {
    icon: Zap,
    title: "Unlimited Courses and Guides",
    description: "No limits on number of courses, guides, and quizzes",
    highlight: true
  },
  {
    icon: MessageCircleIcon,
    title: "Extended Chat Limits",
    description: "Chat with AI Tutor and Roadmaps without limits"
  },
  {
    icon: Archive,
    title: "Chat History",
    description: "Access your AI Tutor and roadmap chats later"
  },
  {
    icon: Map,
    title: "Custom Roadmaps",
    description: "Create upto 100 custom roadmaps"
  }
];
function UpgradeAccountModal(props) {
  const { onClose, success, cancel } = props;
  const [selectedPlan, setSelectedPlan] = useState("year");
  const [isUpdatingPlan, setIsUpdatingPlan] = useState(false);
  const user = getUser();
  const {
    data: userBillingDetails,
    isLoading,
    error: billingError
  } = useQuery(billingDetailsOptions(), queryClient);
  const toast = useToast();
  const {
    mutate: createCheckoutSession,
    isPending: isCreatingCheckoutSession
  } = useMutation(
    {
      mutationFn: (body) => {
        return httpPost(
          "/v1-create-subscription-checkout-session",
          body
        );
      },
      onSuccess: (data) => {
        window.location.href = data.checkoutUrl;
      },
      onError: (error) => {
        console.error(error);
        toast.error(error?.message || "Failed to create checkout session");
      }
    },
    queryClient
  );
  const isCanceled = ["canceled", "incomplete_expired"].includes(
    userBillingDetails?.status || ""
  );
  const selectedPlanDetails = USER_SUBSCRIPTION_PLAN_PRICES.find(
    (plan) => plan.interval === selectedPlan
  );
  const currentPlanPriceId = isCanceled ? null : userBillingDetails?.priceId;
  const currentPlan = USER_SUBSCRIPTION_PLAN_PRICES.find(
    (plan) => plan.priceId === currentPlanPriceId
  );
  const monthlyPlan = USER_SUBSCRIPTION_PLAN_PRICES.find(
    (p) => p.interval === "month"
  );
  const yearlyPlan = USER_SUBSCRIPTION_PLAN_PRICES.find(
    (p) => p.interval === "year"
  );
  useEffect(() => {
    if (!currentPlan) {
      return;
    }
    setSelectedPlan(currentPlan.interval);
  }, [currentPlan]);
  useEffect(() => {
    window?.fireEvent({
      action: "tutor_pricing",
      category: "ai_tutor",
      label: "Clicked Upgrade to Pro"
    });
  }, []);
  if (!user) {
    return null;
  }
  if (isLoading) {
    return /* @__PURE__ */ jsx(
      Modal,
      {
        onClose,
        bodyClassName: "p-0 bg-white",
        wrapperClassName: "h-auto rounded-lg max-w-md w-full mx-4",
        overlayClassName: "items-center",
        hasCloseButton: false,
        children: /* @__PURE__ */ jsx("div", { className: "flex h-48 items-center justify-center", children: /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin text-yellow-600" }) })
      }
    );
  }
  if (billingError) {
    return /* @__PURE__ */ jsx(
      Modal,
      {
        onClose,
        bodyClassName: "p-6 bg-white",
        wrapperClassName: "h-auto rounded-lg max-w-md w-full mx-4",
        overlayClassName: "items-center",
        hasCloseButton: true,
        children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-100", children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5 text-red-600" }) }),
          /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-medium text-gray-900", children: "Error" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: billingError?.message || "An error occurred while loading billing details." })
        ] })
      }
    );
  }
  if (isUpdatingPlan && selectedPlanDetails) {
    return /* @__PURE__ */ jsx(
      UpdatePlanConfirmation,
      {
        planDetails: selectedPlanDetails,
        onClose: () => setIsUpdatingPlan(false),
        onCancel: () => setIsUpdatingPlan(false)
      }
    );
  }
  const handlePlanSelect = (plan) => {
    if (!plan) return;
    setSelectedPlan(plan.interval);
    if (!currentPlanPriceId) {
      const currentUrlPath = window.location.pathname;
      const encodedCurrentUrlPath = encodeURIComponent(currentUrlPath);
      const successPage = `/thank-you?next=${encodedCurrentUrlPath}&s=1`;
      window?.fireEvent({
        action: "tutor_checkout",
        category: "ai_tutor",
        label: "Checkout Started"
      });
      createCheckoutSession(
        {
          priceId: plan.priceId,
          success: success || successPage,
          cancel: cancel || `${currentUrlPath}?s=0`
        },
        {
          onSuccess: () => {
            window?.fireEvent({
              action: `tutor_checkout_${plan.interval === "month" ? "mo" : "an"}`,
              category: "ai_tutor",
              label: `${plan.interval} Plan Checkout Started`
            });
          }
        }
      );
      return;
    }
    setIsUpdatingPlan(true);
  };
  return /* @__PURE__ */ jsx(
    Modal,
    {
      onClose,
      bodyClassName: "p-0 bg-white",
      wrapperClassName: "h-auto rounded-lg max-w-md w-full mx-4",
      overlayClassName: "items-center",
      hasCloseButton: false,
      children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onClose,
            className: "absolute top-3 right-3 z-10 flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:text-gray-600",
            children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "border-b border-gray-100 px-6 py-6 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-yellow-200 bg-yellow-50", children: /* @__PURE__ */ jsx(Crown, { className: "h-6 w-6 text-yellow-600" }) }),
          /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold text-gray-900", children: "Upgrade to Premium" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Unlock all features and supercharge your learning" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("div", { className: "space-y-3", children: PREMIUM_PERKS.map((perk, index) => {
          const Icon = perk.icon;
          return /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
            /* @__PURE__ */ jsx(Icon, { className: "relative top-[0.5px] mt-1 size-4 text-gray-600" }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsx("p", { className: "mb-0.5 text-sm font-medium text-gray-900", children: perk.title }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600", children: perk.description })
            ] })
          ] }, index);
        }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-100 px-6 py-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            yearlyPlan && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handlePlanSelect(yearlyPlan),
                disabled: isCreatingCheckoutSession || currentPlan?.interval === "year",
                className: `flex h-11 w-full items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors disabled:opacity-50 ${currentPlan?.interval === "year" ? "cursor-not-allowed bg-yellow-300 text-gray-700" : "bg-yellow-400 text-black hover:bg-yellow-500"}`,
                children: isCreatingCheckoutSession && selectedPlan === "year" ? /* @__PURE__ */ jsx(Loader2, { className: "mx-auto h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxs("div", { className: "flex w-full items-center justify-between text-left", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Yearly Plan - $",
                    yearlyPlan.amount,
                    "/year"
                  ] }),
                  currentPlan?.interval === "year" ? /* @__PURE__ */ jsx("span", { className: "rounded bg-green-600 px-2 py-1 text-xs text-white", children: "Current Plan" }) : monthlyPlan && /* @__PURE__ */ jsxs("span", { className: "rounded bg-yellow-600 px-2 py-1 text-xs text-white", children: [
                    Math.round(
                      (monthlyPlan.amount * 12 - yearlyPlan.amount) / monthlyPlan.amount
                    ),
                    " ",
                    "months free"
                  ] })
                ] })
              }
            ),
            monthlyPlan && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handlePlanSelect(monthlyPlan),
                disabled: isCreatingCheckoutSession || currentPlan?.interval === "month",
                className: `flex h-11 w-full items-center justify-center rounded-lg border px-4 text-sm font-medium transition-colors disabled:opacity-50 ${currentPlan?.interval === "month" ? "cursor-not-allowed border-yellow-300 bg-yellow-50 text-gray-700" : "border-yellow-400 bg-yellow-50 text-black hover:bg-yellow-100"}`,
                children: isCreatingCheckoutSession && selectedPlan === "month" ? /* @__PURE__ */ jsx(Loader2, { className: "mx-auto h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxs("div", { className: "flex w-full items-center justify-between text-left", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Monthly Plan - $",
                    monthlyPlan.amount,
                    "/month"
                  ] }),
                  currentPlan?.interval === "month" && /* @__PURE__ */ jsx("span", { className: "rounded bg-black px-2 py-1 text-xs text-white", children: "Current Plan" })
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
            "By upgrading you agree to our",
            " ",
            /* @__PURE__ */ jsx("a", { href: "/terms", className: "text-yellow-600 hover:underline", children: "terms and conditions" })
          ] }) })
        ] })
      ] })
    }
  );
}

export { UpgradeAccountModal as U };
