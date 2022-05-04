import Iconify from '../../components/Iconify';

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

let loggedInUserRole = localStorage.getItem('role');
loggedInUserRole = 'admin';
const sidebarConfig =
  loggedInUserRole === 'admin'
    ? [
        {
          title: 'dashboard',
          path: '/dashboard/app',
          icon: getIcon('eva:pie-chart-2-fill')
        },
        {
          title: 'study permit cases',
          path: '/dashboard/caseStudy',
          icon: getIcon('eva:people-fill')
        },
        {
          title: 'work permit cases',
          path: '/dashboard/caseWork',
          icon: getIcon('eva:file-text-fill')
        },
        {
          title: 'PR cases',
          path: '/dashboard/casePR',
          icon: getIcon('eva:file-text-fill')
        },
        {
          title: 'follow up pending',
          path: '/dashboard/followUp',
          icon: getIcon('eva:people-fill')
        }
        // {
        //   title: 'login',
        //   path: '/login',
        //   icon: getIcon('eva:lock-fill')
        // },
        // {
        //   title: 'register',
        //   path: '/register',
        //   icon: getIcon('eva:person-add-fill')
        // },
        // {
        //   title: 'Not found',
        //   path: '/404',
        //   icon: getIcon('eva:alert-triangle-fill')
        // }
      ]
    : loggedInUserRole === 'bishan'
    ? [
        {
          title: 'study permit cases',
          path: '/dashboard/caseStudy',
          icon: getIcon('eva:people-fill')
        },
        {
          title: 'work permit cases',
          path: '/dashboard/caseWork',
          icon: getIcon('eva:file-text-fill')
        },
        {
          title: 'follow up pending',
          path: '/dashboard/followUp',
          icon: getIcon('eva:people-fill')
        }
      ]
    : loggedInUserRole === 'monish'
    ? [
        {
          title: 'PR cases',
          path: '/dashboard/casePR',
          icon: getIcon('eva:file-text-fill')
        },
        {
          title: 'follow up pending',
          path: '/dashboard/followUp',
          icon: getIcon('eva:people-fill')
        }
      ]
    : loggedInUserRole === 'dev'
    ? [
        {
          title: 'dashboard',
          path: '/dashboard/app',
          icon: getIcon('eva:pie-chart-2-fill')
        },
        {
          title: 'study permit cases',
          path: '/dashboard/caseStudy',
          icon: getIcon('eva:people-fill')
        },
        // {
        //   title: 'product',
        //   path: '/dashboard/products',
        //   icon: getIcon('eva:shopping-bag-fill')
        // },
        // {
        //   title: 'blog',
        //   path: '/dashboard/blog',
        //   icon: getIcon('eva:file-text-fill')
        // },
        // {
        //   title: 'work permit cases',
        //   path: '/dashboard/caseWork',
        //   icon: getIcon('eva:file-text-fill')
        // },
        {
          title: 'work permit cases',
          path: '/dashboard/caseWork',
          icon: getIcon('eva:file-text-fill')
        },
        {
          title: 'PR cases',
          path: '/dashboard/casePR',
          icon: getIcon('eva:file-text-fill')
        },
        {
          title: 'follow up pending',
          path: '/dashboard/followUp',
          icon: getIcon('eva:people-fill')
        }
      ]
    : [];

export default sidebarConfig;
