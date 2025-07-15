import { 
  Home, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  BookOpen, 
  User,
  LogOut 
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    name: "Meus Leads",
    href: "/leads",
    icon: Users,
  },
  {
    name: "Minhas Vendas",
    href: "/vendas",
    icon: ShoppingBag,
  },
  {
    name: "Minhas Comissões",
    href: "/comissoes",
    icon: DollarSign,
  },
  {
    name: "Materiais de Apoio",
    href: "/materiais",
    icon: BookOpen,
  },
  {
    name: "Perfil",
    href: "/perfil",
    icon: User,
  },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col h-full">
      <nav className="flex-1 space-y-1 p-4">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-elegant"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200 w-full"
          onClick={() => {
            // Handle logout
            console.log("Logout clicked");
          }}
        >
          <LogOut className="h-5 w-5" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}