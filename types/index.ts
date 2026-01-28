// Navigation types
export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: string;
  children?: NavItem[];
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'manager' | 'viewer';
}

// Store types
export interface Store {
  id: string;
  name: string;
  address: string;
  status: 'active' | 'inactive' | 'pending';
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Owner types
export interface Owner {
  id: string;
  name: string;
  email: string;
  phone: string;
  storeIds: string[];
  createdAt: Date;
}

// Order types
export interface Order {
  id: string;
  storeId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

// Dashboard types
export interface DashboardStats {
  totalStores: number;
  activeStores: number;
  totalOrders: number;
  todayRevenue: number;
}
