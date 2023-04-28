import { PATH_DASHBOARD, PATH_USER } from "src/routes/paths";
const getIconURI = (name) => `/icons/${name}.svg`;

const ICONS = {
  blog: getIconURI("ic_blog"),
  cart: getIconURI("ic_cart"),
  chat: getIconURI("ic_chat"),
  mail: getIconURI("ic_mail"),
  user: getIconURI("ic_user"),
  kanban: getIconURI("ic_kanban"),
  banking: getIconURI("ic_banking"),
  booking: getIconURI("ic_booking"),
  invoice: getIconURI("ic_invoice"),
  calendar: getIconURI("ic_calendar"),
  ecommerce: getIconURI("ic_ecommerce"),
  analytics: getIconURI("ic_analytics"),
  dashboard: getIconURI("ic_dashboard"),
  settings: getIconURI("ic_settings"),
  tools: getIconURI("ic_tools"),
  member_management: getIconURI("ic_member_management"),
  subadmin: getIconURI("ic_subadmin"),
  holdingtank: getIconURI("ic_holdingtank"),
  store: getIconURI("ic_store"),
  user_subscription: getIconURI("ic_user_subscription"),
  report: getIconURI("ic_report"),
  online_store: getIconURI("ic_store"),
  my_subscription: getIconURI("ic_user_subscription"),
  business_builder: getIconURI("ic_bb"),
  profile: getIconURI("ic_profile"),
  help_center: getIconURI("ic_helpcenter"),
};

const navConfig = {
  BINARY: {
    user: [
      {
        items: [
          {
            title: "dashboard",
            path: PATH_USER.user_dashboard,
            icon: ICONS.dashboard,
          },

          {
            title: "joinTelegram",
            path: "https://web.telegram.org/",
            icon: ICONS.chat,
          },

          {
            title: "onlineStore",
            path: PATH_USER.onlineStore.root,
            icon: ICONS.online_store,
            children: [
              {
                title: "product",
                path: PATH_USER.onlineStore.productSubscription.root,
              },
              { title: "myOrders", path: PATH_USER.my_orders.root },
            ],
          },
          {
            title: "mySubscriptions",
            icon: ICONS.my_subscription,
            path: PATH_USER.subscriptions.root,
          },
          {
            title: "genealogy",
            icon: ICONS.kanban,
            path: PATH_USER.genealogy.root,
            children: [
              { title: "binary", path: PATH_USER.genealogy.binary },
              { title: "Sponsor", path: PATH_USER.genealogy.sponsor },
              {
                title: "affiliateDashboard",
                path: PATH_USER.genealogy.affiliate,
              },
              {
                title: "binaryLegSettings",
                path: PATH_USER.genealogy.binaryLeg,
              },
            ],
          },
          {
            title: "financial",
            path: PATH_USER.financial.root,
            icon: ICONS.ecommerce,
            children: [
              {
                title: "myEWallet",
                path: PATH_USER.financial.eWallet,
              },
              {
                title: "depositWallet",
                path: PATH_USER.financial.depositWallet,
              },
              {
                title: "fundTransfer",
                path: PATH_USER.financial.fundsTransfer,
              },
              {
                title: "requestPayout",
                path: PATH_USER.financial.payout,
              },
            ],
          },
          {
            title: "businessBuilder",
            icon: ICONS.business_builder,
            path: PATH_USER.business_builder.root,
            children: [
              {
                title: "subscriptions",
                path: PATH_USER.business_builder.subscriptions,
              },
              {
                title: "materials",
                path: PATH_USER.business_builder.materials.root,
              },
            ],
          },
          {
            title: "myProfile",
            icon: ICONS.profile,
            path: PATH_USER.profile.root,
          },
          {
            title: "blogs",
            icon: ICONS.blog,
            path: PATH_USER.blogs.root,
          },
          {
            title: "helpCenter",
            path: PATH_USER.helpCenter.root,
            icon: ICONS.help_center,
            children: [
              {
                title: "faqs",
                path: PATH_USER.helpCenter.faq.root,
              },
              {
                title: "knowledgeBase",
                path: PATH_USER.helpCenter.knowledgeBase.root,
              },
              {
                title: "emails",
                path: PATH_USER.helpCenter.mails.all,
              },
              {
                title: "createTicket",
                path: PATH_USER.helpCenter.createTicket.view,
              },
            ],
          },
          {
            title: "incomeReport",
            path: PATH_USER.incomeReport.root,
            icon: ICONS.report,
          },
        ],
      },
    ],
    admin: [
      {
        items: [
          {
            title: "dashboard",
            path: PATH_DASHBOARD.dashboard.root,
            icon: ICONS.dashboard,
            children: [
              {
                title: "business",
                path: PATH_DASHBOARD.dashboard.business,
              },
              {
                title: "network",
                path: PATH_DASHBOARD.dashboard.network,
              },
            ],
          },

          {
            title: "genealogy",
            path: PATH_DASHBOARD.genealogy.root,
            icon: ICONS.kanban,
            children: [
              {
                title: "binary",
                path: PATH_DASHBOARD.genealogy.binary,
              },
              {
                title: "sponsor",
                path: PATH_DASHBOARD.genealogy.sponsor,
              },
              { title: "tree", path: PATH_DASHBOARD.genealogy.tree },
            ],
          },
          {
            title: "financial",
            path: PATH_DASHBOARD.financial.root,
            icon: ICONS.ecommerce,
            children: [
              {
                title: "ewallet",
                path: PATH_DASHBOARD.financial.ewallet,
              },
              {
                title: "depositWallet",
                path: PATH_DASHBOARD.financial.deposit_wallet,
              },
              {
                title: "fundCredits",
                path: PATH_DASHBOARD.financial.fund_credits,
              },
              {
                title: "payout",
                path: PATH_DASHBOARD.financial.payout,
              },
            ],
          },
          {
            title: "communication",
            path: PATH_DASHBOARD.communication.root,
            icon: ICONS.chat,
            children: [
              {
                title: "blog",
                path: PATH_DASHBOARD.communication.blog,
              },
              {
                title: "faqs",
                path: PATH_DASHBOARD.communication.com_faqs,
              },
              {
                title: "emails",
                path: PATH_DASHBOARD.communication.mails,
              },
              {
                title: "helpCenterr",
                path: PATH_DASHBOARD.communication.help_center,
              },
              {
                title: "article",
                path: PATH_DASHBOARD.communication.com_article,
              },
            ],
          },

          {
            title: "tools",
            path: PATH_DASHBOARD.tools.root,
            icon: ICONS.tools,
            children: [
              {
                title: "documents",
                path: PATH_DASHBOARD.tools.documents,
              },
              { title: "videos", path: PATH_DASHBOARD.tools.videos },
            ],
          },
          {
            title: "membersManagement",
            path: PATH_DASHBOARD.members.root,
            icon: ICONS.member_management,
            children: [
              {
                title: "networkMembers",
                path: PATH_DASHBOARD.members.network,
              },
              {
                title: "holdingTank",
                path: PATH_DASHBOARD.members.holdingTank,
              },
            ],
          },

          {
            title: "subAdmin",
            path: PATH_DASHBOARD.subAdmin.root,
            icon: ICONS.subadmin,
            children: [
              {
                title: "subAdmins",
                path: PATH_DASHBOARD.subAdmin.sub_admins,
              },
            ],
          },

          {
            title: "store",
            path: PATH_DASHBOARD.store.root,
            icon: ICONS.store,
            children: [
              {
                title: "products",
                path: PATH_DASHBOARD.store.products,
              },
              {
                title: "material",
                path: PATH_DASHBOARD.store.material,
              },
              { title: "events", path: PATH_DASHBOARD.store.events },
              {
                title: "Coupons",
                path: PATH_DASHBOARD.store.coupons,
              },
              {
                title: "userReviews",
                path: PATH_DASHBOARD.store.user_reviews,
              },

              {
                title: "assignSubscriptions",
                path: PATH_DASHBOARD.store.assign_subscriptions,
              },
              {
                title: "businessBuilderSubscriptionsSales",
                path: PATH_DASHBOARD.store.business_builder_subscriptions,
              },
            ],
          },

          {
            title: "userSubscriptions",
            icon: ICONS.user_subscription,
            path: PATH_DASHBOARD.activeSubscriptions.root,
          },
          {
            title: "statistics",
            icon: ICONS.analytics,
            path: PATH_DASHBOARD.statistics.root,
          },
        ],
      },

      {
        subheader: "general",
        items: [
          {
            title: "settings",
            path: PATH_DASHBOARD.settings.root,
            icon: ICONS.settings,
            children: [
              {
                title: "brand",
                path: PATH_DASHBOARD.settings.brand,
              },
              {
                title: "businessBuilder",
                path: PATH_DASHBOARD.settings.business,
              },
              {
                title: "network",
                path: PATH_DASHBOARD.settings.network.root,
              },
              {
                title: "Withdrawal",
                path: PATH_DASHBOARD.settings.withdrawal,
              },
            ],
          },
          {
            title: "reports",
            path: PATH_DASHBOARD.report.root,
            icon: ICONS.report,
            children: [
              {
                title: "builderSubscription",
                path: PATH_DASHBOARD.report.builder,
              },
              {
                title: "fundCredit",
                path: PATH_DASHBOARD.report.fund_credit,
              },
              {
                title: "joiningReport",
                path: PATH_DASHBOARD.report.joining,
              },
              {
                title: "memberIncome",
                path: PATH_DASHBOARD.report.member_income,
              },
              {
                title: "payout",
                path: PATH_DASHBOARD.report.payout_report,
              },
              {
                title: "pointHistory",
                path: PATH_DASHBOARD.report.point_history,
              },
              {
                title: "sales",
                path: PATH_DASHBOARD.report.sales_report,
              },
              {
                title: "topEarners",
                path: PATH_DASHBOARD.report.top_earners,
              },
            ],
          },
        ],
      },
    ],
  },
  UNILEVEL: {
    user: [
      {
        items: [
          {
            title: "dashboard",
            path: PATH_USER.user_dashboard,
            icon: ICONS.dashboard,
          },

          {
            title: "joinTelegram",
            path: "https://web.telegram.org/",
            icon: ICONS.chat,
          },

          {
            title: "onlineStore",
            path: PATH_USER.onlineStore.root,
            icon: ICONS.online_store,
            children: [
              {
                title: "product",
                path: PATH_USER.onlineStore.productSubscription.root,
              },
              { title: "myOrders", path: PATH_USER.my_orders.root },
            ],
          },
          {
            title: "mySubscriptions",
            icon: ICONS.my_subscription,
            path: PATH_USER.subscriptions.root,
          },
          {
            title: "genealogy",
            icon: ICONS.kanban,
            path: PATH_USER.genealogy.root,
            children: [{ title: "Sponsor", path: PATH_USER.genealogy.sponsor }],
          },
          {
            title: "financial",
            path: PATH_USER.financial.root,
            icon: ICONS.ecommerce,
            children: [
              {
                title: "myEWallet",
                path: PATH_USER.financial.eWallet,
              },
              {
                title: "depositWallet",
                path: PATH_USER.financial.depositWallet,
              },
              {
                title: "fundTransfer",
                path: PATH_USER.financial.fundsTransfer,
              },
              {
                title: "requestPayout",
                path: PATH_USER.financial.payout,
              },
            ],
          },
          // {
          //   title: "businessBuilder",
          //   icon: ICONS.business_builder,
          //   path: PATH_USER.business_builder.root,
          //   children: [
          //     {
          //       title: "subscriptions",
          //       path: PATH_USER.business_builder.subscriptions,
          //     },
          //     {
          //       title: "materials",
          //       path: PATH_USER.business_builder.materials.root,
          //     },
          //   ],
          // },
          {
            title: "myProfile",
            icon: ICONS.profile,
            path: PATH_USER.profile.root,
          },
          {
            title: "blogs",
            icon: ICONS.blog,
            path: PATH_USER.blogs.root,
          },
          {
            title: "helpCenter",
            path: PATH_USER.helpCenter.root,
            icon: ICONS.help_center,
            children: [
              {
                title: "faqs",
                path: PATH_USER.helpCenter.faq.root,
              },
              {
                title: "knowledgeBase",
                path: PATH_USER.helpCenter.knowledgeBase.root,
              },
              {
                title: "emails",
                path: PATH_USER.helpCenter.mails.all,
              },
              {
                title: "createTicket",
                path: PATH_USER.helpCenter.createTicket.view,
              },
            ],
          },
          {
            title: "incomeReport",
            path: PATH_USER.incomeReport.root,
            icon: ICONS.report,
          },
        ],
      },
    ],
    admin: [
      {
        items: [
          {
            title: "dashboard",
            path: PATH_DASHBOARD.dashboard.root,
            icon: ICONS.dashboard,
            children: [
              {
                title: "business",
                path: PATH_DASHBOARD.dashboard.business,
              },
              {
                title: "network",
                path: PATH_DASHBOARD.dashboard.network,
              },
            ],
          },

          {
            title: "genealogy",
            path: PATH_DASHBOARD.genealogy.root,
            icon: ICONS.kanban,
            children: [
              {
                title: "sponsor",
                path: PATH_DASHBOARD.genealogy.sponsor,
              },
              { title: "tree", path: PATH_DASHBOARD.genealogy.tree },
            ],
          },
          {
            title: "financial",
            path: PATH_DASHBOARD.financial.root,
            icon: ICONS.ecommerce,
            children: [
              {
                title: "ewallet",
                path: PATH_DASHBOARD.financial.ewallet,
              },
              {
                title: "depositWallet",
                path: PATH_DASHBOARD.financial.deposit_wallet,
              },
              {
                title: "fundCredits",
                path: PATH_DASHBOARD.financial.fund_credits,
              },
              {
                title: "payout",
                path: PATH_DASHBOARD.financial.payout,
              },
            ],
          },
          {
            title: "communication",
            path: PATH_DASHBOARD.communication.root,
            icon: ICONS.chat,
            children: [
              {
                title: "blog",
                path: PATH_DASHBOARD.communication.blog,
              },
              {
                title: "faqs",
                path: PATH_DASHBOARD.communication.com_faqs,
              },
              {
                title: "emails",
                path: PATH_DASHBOARD.communication.mails,
              },
              {
                title: "helpCenterr",
                path: PATH_DASHBOARD.communication.help_center,
              },
              {
                title: "article",
                path: PATH_DASHBOARD.communication.com_article,
              },
            ],
          },

          {
            title: "tools",
            path: PATH_DASHBOARD.tools.root,
            icon: ICONS.tools,
            children: [
              {
                title: "documents",
                path: PATH_DASHBOARD.tools.documents,
              },
              { title: "videos", path: PATH_DASHBOARD.tools.videos },
            ],
          },
          {
            title: "membersManagement",
            path: PATH_DASHBOARD.members.root,
            icon: ICONS.member_management,
            children: [
              {
                title: "networkMembers",
                path: PATH_DASHBOARD.members.network,
              },
              {
                title: "holdingTank",
                path: PATH_DASHBOARD.members.holdingTank,
              },
            ],
          },

          {
            title: "subAdmin",
            path: PATH_DASHBOARD.subAdmin.root,
            icon: ICONS.subadmin,
            children: [
              {
                title: "subAdmins",
                path: PATH_DASHBOARD.subAdmin.sub_admins,
              },
            ],
          },

          {
            title: "store",
            path: PATH_DASHBOARD.store.root,
            icon: ICONS.store,
            children: [
              {
                title: "products",
                path: PATH_DASHBOARD.store.products,
              },
              {
                title: "material",
                path: PATH_DASHBOARD.store.material,
              },
              { title: "events", path: PATH_DASHBOARD.store.events },
              {
                title: "Coupons",
                path: PATH_DASHBOARD.store.coupons,
              },
              {
                title: "userReviews",
                path: PATH_DASHBOARD.store.user_reviews,
              },

              {
                title: "assignSubscriptions",
                path: PATH_DASHBOARD.store.assign_subscriptions,
              },
              // {
              //   title: "businessBuilderSubscriptionsSales",
              //   path: PATH_DASHBOARD.store.business_builder_subscriptions,
              // },
            ],
          },

          {
            title: "userSubscriptions",
            icon: ICONS.user_subscription,
            path: PATH_DASHBOARD.activeSubscriptions.root,
          },
          {
            title: "statistics",
            icon: ICONS.analytics,
            path: PATH_DASHBOARD.statistics.root,
          },
        ],
      },

      {
        subheader: "general",
        items: [
          {
            title: "settings",
            path: PATH_DASHBOARD.settings.root,
            icon: ICONS.settings,
            children: [
              {
                title: "brand",
                path: PATH_DASHBOARD.settings.brand,
              },
              // {
              //   title: "businessBuilder",
              //   path: PATH_DASHBOARD.settings.business,
              // },
              {
                title: "network",
                path: PATH_DASHBOARD.settings.network.root,
              },
              {
                title: "Withdrawal",
                path: PATH_DASHBOARD.settings.withdrawal,
              },
            ],
          },
          {
            title: "reports",
            path: PATH_DASHBOARD.report.root,
            icon: ICONS.report,
            children: [
              // {
              //   title: "builderSubscription",
              //   path: PATH_DASHBOARD.report.builder,
              // },
              {
                title: "fundCredit",
                path: PATH_DASHBOARD.report.fund_credit,
              },
              {
                title: "joiningReport",
                path: PATH_DASHBOARD.report.joining,
              },
              {
                title: "memberIncome",
                path: PATH_DASHBOARD.report.member_income,
              },
              {
                title: "payout",
                path: PATH_DASHBOARD.report.payout_report,
              },

              {
                title: "sales",
                path: PATH_DASHBOARD.report.sales_report,
              },
              {
                title: "topEarners",
                path: PATH_DASHBOARD.report.top_earners,
              },
            ],
          },
        ],
      },
    ],
  },
  MATRIX: {
    user: [
      {
        items: [
          {
            title: "dashboard",
            path: PATH_USER.user_dashboard,
            icon: ICONS.dashboard,
          },

          {
            title: "joinTelegram",
            path: "https://web.telegram.org/",
            icon: ICONS.chat,
          },

          {
            title: "onlineStore",
            path: PATH_USER.onlineStore.root,
            icon: ICONS.online_store,
            children: [
              {
                title: "product",
                path: PATH_USER.onlineStore.productSubscription.root,
              },
              { title: "myOrders", path: PATH_USER.my_orders.root },
            ],
          },
          {
            title: "mySubscriptions",
            icon: ICONS.my_subscription,
            path: PATH_USER.subscriptions.root,
          },
          {
            title: "genealogy",
            icon: ICONS.kanban,
            path: PATH_USER.genealogy.root,
            children: [
              { title: "matrix", path: PATH_USER.genealogy.matrix },
              { title: "Sponsor", path: PATH_USER.genealogy.sponsor },
            ],
          },
          {
            title: "financial",
            path: PATH_USER.financial.root,
            icon: ICONS.ecommerce,
            children: [
              {
                title: "myEWallet",
                path: PATH_USER.financial.eWallet,
              },
              {
                title: "depositWallet",
                path: PATH_USER.financial.depositWallet,
              },
              {
                title: "fundTransfer",
                path: PATH_USER.financial.fundsTransfer,
              },
              {
                title: "requestPayout",
                path: PATH_USER.financial.payout,
              },
            ],
          },
          // {
          //   title: "businessBuilder",
          //   icon: ICONS.business_builder,
          //   path: PATH_USER.business_builder.root,
          //   children: [
          //     {
          //       title: "subscriptions",
          //       path: PATH_USER.business_builder.subscriptions,
          //     },
          //     {
          //       title: "materials",
          //       path: PATH_USER.business_builder.materials.root,
          //     },
          //   ],
          // },
          {
            title: "myProfile",
            icon: ICONS.profile,
            path: PATH_USER.profile.root,
          },
          {
            title: "blogs",
            icon: ICONS.blog,
            path: PATH_USER.blogs.root,
          },
          {
            title: "helpCenter",
            path: PATH_USER.helpCenter.root,
            icon: ICONS.help_center,
            children: [
              {
                title: "faqs",
                path: PATH_USER.helpCenter.faq.root,
              },
              {
                title: "knowledgeBase",
                path: PATH_USER.helpCenter.knowledgeBase.root,
              },
              {
                title: "emails",
                path: PATH_USER.helpCenter.mails.all,
              },
              {
                title: "createTicket",
                path: PATH_USER.helpCenter.createTicket.view,
              },
            ],
          },
          {
            title: "incomeReport",
            path: PATH_USER.incomeReport.root,
            icon: ICONS.report,
          },
        ],
      },
    ],
    admin: [
      {
        items: [
          {
            title: "dashboard",
            path: PATH_DASHBOARD.dashboard.root,
            icon: ICONS.dashboard,
            children: [
              {
                title: "business",
                path: PATH_DASHBOARD.dashboard.business,
              },
              {
                title: "network",
                path: PATH_DASHBOARD.dashboard.network,
              },
            ],
          },

          {
            title: "genealogy",
            path: PATH_DASHBOARD.genealogy.root,
            icon: ICONS.kanban,
            children: [
              {
                title: "matrix",
                path: PATH_DASHBOARD.genealogy.matrix,
              },
              {
                title: "sponsor",
                path: PATH_DASHBOARD.genealogy.sponsor,
              },
              { title: "tree", path: PATH_DASHBOARD.genealogy.tree },
            ],
          },
          {
            title: "financial",
            path: PATH_DASHBOARD.financial.root,
            icon: ICONS.ecommerce,
            children: [
              {
                title: "ewallet",
                path: PATH_DASHBOARD.financial.ewallet,
              },
              {
                title: "depositWallet",
                path: PATH_DASHBOARD.financial.deposit_wallet,
              },
              {
                title: "fundCredits",
                path: PATH_DASHBOARD.financial.fund_credits,
              },
              {
                title: "payout",
                path: PATH_DASHBOARD.financial.payout,
              },
            ],
          },
          {
            title: "communication",
            path: PATH_DASHBOARD.communication.root,
            icon: ICONS.chat,
            children: [
              {
                title: "blog",
                path: PATH_DASHBOARD.communication.blog,
              },
              {
                title: "faqs",
                path: PATH_DASHBOARD.communication.com_faqs,
              },
              {
                title: "emails",
                path: PATH_DASHBOARD.communication.mails,
              },
              {
                title: "helpCenterr",
                path: PATH_DASHBOARD.communication.help_center,
              },
              {
                title: "article",
                path: PATH_DASHBOARD.communication.com_article,
              },
            ],
          },

          {
            title: "tools",
            path: PATH_DASHBOARD.tools.root,
            icon: ICONS.tools,
            children: [
              {
                title: "documents",
                path: PATH_DASHBOARD.tools.documents,
              },
              { title: "videos", path: PATH_DASHBOARD.tools.videos },
            ],
          },
          {
            title: "membersManagement",
            path: PATH_DASHBOARD.members.root,
            icon: ICONS.member_management,
            children: [
              {
                title: "networkMembers",
                path: PATH_DASHBOARD.members.network,
              },
              {
                title: "holdingTank",
                path: PATH_DASHBOARD.members.holdingTank,
              },
            ],
          },

          {
            title: "subAdmin",
            path: PATH_DASHBOARD.subAdmin.root,
            icon: ICONS.subadmin,
            children: [
              {
                title: "subAdmins",
                path: PATH_DASHBOARD.subAdmin.sub_admins,
              },
            ],
          },

          {
            title: "store",
            path: PATH_DASHBOARD.store.root,
            icon: ICONS.store,
            children: [
              {
                title: "products",
                path: PATH_DASHBOARD.store.products,
              },
              {
                title: "material",
                path: PATH_DASHBOARD.store.material,
              },
              { title: "events", path: PATH_DASHBOARD.store.events },
              {
                title: "Coupons",
                path: PATH_DASHBOARD.store.coupons,
              },
              {
                title: "userReviews",
                path: PATH_DASHBOARD.store.user_reviews,
              },

              {
                title: "assignSubscriptions",
                path: PATH_DASHBOARD.store.assign_subscriptions,
              },
              // {
              //   title: "businessBuilderSubscriptionsSales",
              //   path: PATH_DASHBOARD.store.business_builder_subscriptions,
              // },
            ],
          },

          {
            title: "userSubscriptions",
            icon: ICONS.user_subscription,
            path: PATH_DASHBOARD.activeSubscriptions.root,
          },
          {
            title: "statistics",
            icon: ICONS.analytics,
            path: PATH_DASHBOARD.statistics.root,
          },
        ],
      },

      {
        subheader: "general",
        items: [
          {
            title: "settings",
            path: PATH_DASHBOARD.settings.root,
            icon: ICONS.settings,
            children: [
              {
                title: "brand",
                path: PATH_DASHBOARD.settings.brand,
              },
              // {
              //   title: "businessBuilder",
              //   path: PATH_DASHBOARD.settings.business,
              // },
              {
                title: "network",
                path: PATH_DASHBOARD.settings.network.root,
              },
              {
                title: "Withdrawal",
                path: PATH_DASHBOARD.settings.withdrawal,
              },
            ],
          },
          {
            title: "reports",
            path: PATH_DASHBOARD.report.root,
            icon: ICONS.report,
            children: [
              // {
              //   title: "builderSubscription",
              //   path: PATH_DASHBOARD.report.builder,
              // },
              {
                title: "fundCredit",
                path: PATH_DASHBOARD.report.fund_credit,
              },
              {
                title: "joiningReport",
                path: PATH_DASHBOARD.report.joining,
              },
              {
                title: "memberIncome",
                path: PATH_DASHBOARD.report.member_income,
              },
              {
                title: "payout",
                path: PATH_DASHBOARD.report.payout_report,
              },
              {
                title: "sales",
                path: PATH_DASHBOARD.report.sales_report,
              },
              {
                title: "topEarners",
                path: PATH_DASHBOARD.report.top_earners,
              },
            ],
          },
        ],
      },
    ],
  },
  ROI: {
    user: [
      {
        items: [
          {
            title: "dashboard",
            path: PATH_USER.user_dashboard,
            icon: ICONS.dashboard,
          },

          {
            title: "joinTelegram",
            path: "https://web.telegram.org/",
            icon: ICONS.chat,
          },

          {
            title: "onlineStore",
            path: PATH_USER.onlineStore.root,
            icon: ICONS.online_store,
            children: [
              {
                title: "package",
                path: PATH_USER.onlineStore.productSubscription.root,
              },
              { title: "myOrders", path: PATH_USER.my_orders.root },
            ],
          },
          {
            title: "mySubscriptions",
            icon: ICONS.my_subscription,
            path: PATH_USER.subscriptions.root,
          },
          {
            title: "genealogy",
            icon: ICONS.kanban,
            path: PATH_USER.genealogy.root,
            children: [
              // { title: "binary", path: PATH_USER.genealogy.binary },
              {
                title: "Sponsor",
                path: PATH_USER.genealogy.sponsor,
              },
              // {
              //   title: ("affiliateDashboard"),
              //   path: PATH_USER.genealogy.affiliate,
              // },
              // {
              //   title: "binaryLegSettings",
              //   path: PATH_USER.genealogy.binaryLeg,
              // },
            ],
          },
          {
            title: "financial",
            path: PATH_USER.financial.root,
            icon: ICONS.ecommerce,
            children: [
              {
                title: "myEWallet",
                path: PATH_USER.financial.eWallet,
              },
              // {
              //   title: ("depositWallet"),
              //   path: PATH_USER.financial.depositWallet,
              // },
              {
                title: "fundTransfer",
                path: PATH_USER.financial.fundsTransfer,
              },
              {
                title: "requestPayout",
                path: PATH_USER.financial.payout,
              },
            ],
          },
          // {
          //   title: "businessBuilder",
          //   icon: ICONS.business_builder,
          //   path: PATH_USER.business_builder.root,
          //   children: [
          //     {
          //       title: "subscriptions",
          //       path: PATH_USER.business_builder.subscriptions,
          //     },
          //     {
          //       title: "materials",
          //       path: PATH_USER.business_builder.materials.root,
          //     },
          //   ],
          // },
          {
            title: "myProfile",
            icon: ICONS.profile,
            path: PATH_USER.profile.root,
          },
          {
            title: "blogs",
            icon: ICONS.blog,
            path: PATH_USER.blogs.root,
          },
          {
            title: "helpCenter",
            path: PATH_USER.helpCenter.root,
            icon: ICONS.help_center,
            children: [
              {
                title: "faqs",
                path: PATH_USER.helpCenter.faq.root,
              },
              {
                title: "knowledgeBase",
                path: PATH_USER.helpCenter.knowledgeBase.root,
              },
              {
                title: "emails",
                path: PATH_USER.helpCenter.mails.all,
              },
              {
                title: "createTicket",
                path: PATH_USER.helpCenter.createTicket.view,
              },
            ],
          },
          {
            title: "incomeReport",
            path: PATH_USER.incomeReport.root,
            icon: ICONS.report,
          },
        ],
      },
    ],
    admin: [
      {
        items: [
          {
            title: "dashboard",
            path: PATH_DASHBOARD.dashboard.root,
            icon: ICONS.dashboard,
            children: [
              {
                title: "business",
                path: PATH_DASHBOARD.dashboard.business,
              },
              {
                title: "network",
                path: PATH_DASHBOARD.dashboard.network,
              },
            ],
          },

          {
            title: "genealogy",
            path: PATH_DASHBOARD.genealogy.root,
            icon: ICONS.kanban,
            children: [
              // {
              //   title: "binary",
              //   path: PATH_DASHBOARD.genealogy.binary,
              // },
              {
                title: "sponsor",
                path: PATH_DASHBOARD.genealogy.sponsor,
              },
              { title: "tree", path: PATH_DASHBOARD.genealogy.tree },
            ],
          },
          {
            title: "financial",
            path: PATH_DASHBOARD.financial.root,
            icon: ICONS.ecommerce,
            children: [
              {
                title: "myEWallet",
                path: PATH_DASHBOARD.financial.ewallet,
              },

              {
                title: "fundCredits",
                path: PATH_DASHBOARD.financial.fund_credits,
              },
              {
                title: "payout",
                path: PATH_DASHBOARD.financial.payout,
              },
              {
                title: "sales",
                path: PATH_DASHBOARD.financial.sales,
              },
            ],
          },
          {
            title: "communication",
            path: PATH_DASHBOARD.communication.root,
            icon: ICONS.chat,
            children: [
              {
                title: "blogs",
                path: PATH_DASHBOARD.communication.blog,
              },
              {
                title: "faqs",
                path: PATH_DASHBOARD.communication.com_faqs,
              },
              {
                title: "emails",
                path: PATH_DASHBOARD.communication.mails,
              },
              {
                title: "helpCenter",
                path: PATH_DASHBOARD.communication.help_center,
              },

              {
                title: "article",
                path: PATH_DASHBOARD.communication.com_article,
              },
            ],
          },

          {
            title: "tools",
            path: PATH_DASHBOARD.tools.root,
            icon: ICONS.tools,
            children: [
              {
                title: "dcouments",
                path: PATH_DASHBOARD.tools.documents,
              },
              { title: "videos", path: PATH_DASHBOARD.tools.videos },
            ],
          },
          {
            title: "memberManagement",
            path: PATH_DASHBOARD.members.root,
            icon: ICONS.member_management,
            children: [
              {
                title: "networkMembers",
                path: PATH_DASHBOARD.members.network,
              },
            ],
          },

          {
            title: "subAdmin",
            path: PATH_DASHBOARD.subAdmin.root,
            icon: ICONS.subadmin,
            children: [
              {
                title: "subAdmins",
                path: PATH_DASHBOARD.subAdmin.sub_admins,
              },
            ],
          },

          {
            title: "store",
            path: PATH_DASHBOARD.store.root,
            icon: ICONS.store,
            children: [
              {
                title: "packages",
                path: PATH_DASHBOARD.store.products,
              },
              { title: "events", path: PATH_DASHBOARD.store.events },
            ],
          },

          {
            title: "userSubscriptions",
            icon: ICONS.user_subscription,
            path: PATH_DASHBOARD.activeSubscriptions.root,
          },
          {
            title: "statistics",
            icon: ICONS.analytics,
            path: PATH_DASHBOARD.statistics.root,
          },
        ],
      },

      {
        subheader: "General",
        items: [
          {
            title: "settings",
            path: PATH_DASHBOARD.settings.root,
            icon: ICONS.settings,
            children: [
              {
                title: "brand",
                path: PATH_DASHBOARD.settings.brand,
              },

              {
                title: "network",
                path: PATH_DASHBOARD.settings.network.root,
              },
            ],
          },
          {
            title: "report",
            path: PATH_DASHBOARD.report.root,
            icon: ICONS.report,
            children: [
              {
                title: "fundCredits",
                path: PATH_DASHBOARD.report.fund_credit,
              },
              {
                title: "memberIncome",
                path: PATH_DASHBOARD.report.member_income,
              },
              {
                title: "topEarners",
                path: PATH_DASHBOARD.report.top_earners,
              },
              {
                title: "payout",
                path: PATH_DASHBOARD.report.payout_report,
              },
              {
                title: "sales",
                path: PATH_DASHBOARD.report.sales_report,
              },
            ],
          },
        ],
      },
    ],
  },
};

export default navConfig;
