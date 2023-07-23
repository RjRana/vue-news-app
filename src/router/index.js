import VueRouter from 'vue-router';
import routes from './routes';

// navigation error to ignore
const { NavigationFailureType } = VueRouter;
const ignoredNavigationError = [NavigationFailureType.duplicated, NavigationFailureType.cancelled];
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => {
    if (ignoredNavigationError.includes(err.name)) throw err;
  });
};

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
