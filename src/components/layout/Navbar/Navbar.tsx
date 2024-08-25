import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ExitIcon } from '@radix-ui/react-icons';
import Logo from './Logo';
import NavItem from './NavItem';
import navLinks from './navLinks';
import Sidebar from './Sidebar';

const Navbar = () => {
  const isLoggedIn = true;

  return (
    <div className="h-16 border-b flex justify-between items-center px-6">
      <Logo />
      <div className="hidden md:flex gap-8">
        {navLinks.map((item) => (
          <NavItem key={item.path} to={item.path}>
            {item.text}
          </NavItem>
        ))}
      </div>
      <div className="hidden md:flex gap-2 items-center">
        {isLoggedIn ? (
          <>
            <Button className="text-primary-foreground gap-1" variant="link">
              <ExitIcon />
              <span>Logout</span>
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline">Login</Button>
            <Separator orientation="vertical" className="h-10" />
            <Button className="text-gray-900">Signup</Button>
          </>
        )}
      </div>
      <div className="md:hidden">
        <Sidebar />
      </div>
    </div>
  );
};

export default Navbar;
