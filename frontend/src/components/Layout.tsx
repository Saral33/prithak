import MenuBar from '@/components/MenuBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <div>
        <MenuBar />
      </div>
      <div className="flex-1 ml-[50px] md:ml-[250px]">{children}</div>
    </div>
  );
};

export default Layout;
