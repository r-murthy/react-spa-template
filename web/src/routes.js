import { LoginPage } from "./pages/login.jsx";
import { AboutPage } from "./pages/about.jsx";
import { HomePage } from "./pages/home.jsx";
import { ListSelect } from "./pages/tests/list_select.jsx";
import { SignupPage } from "./pages/signup.jsx";
import { CustomerPage } from "./pages/customers/customer.jsx";
import { ListCustomersPage } from "./pages/customers.jsx";
import { TestPageControls } from "./pages/tests/page_controls.jsx";
import { taskFn } from "./services/task.js";

export default (renderAppElements) => {
  const routeOpts = {
    props: {
      task: taskFn(renderAppElements),
      renderAppElements: renderAppElements,
    },
  };

  function beforeRoute({ resolve }) {
    renderAppElements({ notification: "" });

    resolve();
  }

  return [
    {
      path: "/tests/list-select",
      component: ListSelect,
    },
    {
      path: "/tests/page-controls",
      component: TestPageControls,
    },
    {
      path: "",
      component: HomePage,
      beforeEnter: [beforeRoute],
    },
    {
      path: "/home",
      component: HomePage,
      beforeEnter: [beforeRoute],
    },
    {
      path: "/login",
      component: LoginPage,
      beforeEnter: [beforeRoute],
      options: routeOpts,
    },
    {
      path: "/signup",
      component: SignupPage,
      beforeEnter: [beforeRoute],
      options: routeOpts,
    },
    {
      path: "/about",
      component: AboutPage,
      options: routeOpts,
      beforeEnter: [beforeRoute],
    },
    {
      path: "/customers",
      component: ListCustomersPage,
      options: routeOpts,
      beforeEnter: [beforeRoute],
    },
    {
      path: "/customers/new",
      component: CustomerPage,
      options: routeOpts,
      beforeEnter: [beforeRoute],
    },
    {
      path: "/customers/:customerId",
      component: CustomerPage,
      options: routeOpts,
      beforeEnter: [beforeRoute],
    },
  ];
};
