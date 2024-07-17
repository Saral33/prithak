const userMenu: {
  id: number;
  name: string;
  path: string;
  icon: 'Home' | 'Create';
}[] = [
  {
    id: 1,
    name: 'Home',
    path: '/dashboard',
    icon: 'Home',
  },
  {
    id: 2,
    name: 'Create Task',
    path: '/create-task',
    icon: 'Create',
  },
];

const adminMenu: {
  id: number;
  name: string;
  path: string;
  icon: 'Home' | 'Create';
}[] = [
  {
    id: 1,
    name: 'Home',
    path: '/admin',
    icon: 'Home',
  },
];
export { userMenu, adminMenu };
