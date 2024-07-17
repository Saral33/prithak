import MenuBar from '@/components/MenuBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <div>
        <MenuBar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Layout;
