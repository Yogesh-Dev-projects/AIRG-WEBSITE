export interface MemoryUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  password_hash?: string;
  role: 'CEO' | 'MARKETING' | 'BUSINESS_DEVELOPER' | 'EMPLOYEE' | 'EXTERNAL_BD' | 'COORDINATOR' | 'PURCHASE_MANAGER';
  department: string;
  phone?: string;
  employee_id?: string;
}

export const globalUserStore: MemoryUser[] = [
  {
    _id: 'usr-1',
    name: 'Amit Kumar (BD)',
    email: 'bd@airginternational.com',
    password: 'bd123',
    password_hash: 'bd123',
    role: 'BUSINESS_DEVELOPER',
    department: 'Business Development',
    phone: '9876543210',
    employee_id: 'EMP-BD-01'
  },
  {
    _id: 'usr-2',
    name: 'Priya Sharma (Marketing)',
    email: 'marketing@airginternational.com',
    password: 'mkt123',
    password_hash: 'mkt123',
    role: 'MARKETING',
    department: 'Marketing & Outbound',
    phone: '9822001122',
    employee_id: 'EMP-MKT-02'
  },
  {
    _id: 'usr-3',
    name: 'Rahul Deshmukh (Employee)',
    email: 'employee@airginternational.com',
    password: 'emp123',
    password_hash: 'emp123',
    role: 'EMPLOYEE',
    department: 'Field Operations',
    phone: '9822334455',
    employee_id: 'EMP-OPS-03'
  },
  {
    _id: 'usr-4',
    name: 'Pratap Pawar (CEO)',
    email: 'ceo@airginternational.com',
    password: 'ceo123',
    password_hash: 'ceo123',
    role: 'CEO',
    department: 'Executive Management',
    phone: '9999988888',
    employee_id: 'EMP-CEO-00'
  },
  {
    _id: 'usr-5',
    name: 'Vikram Patil (Broker Partner)',
    email: 'external_bd@airginternational.com',
    password: 'extbd123',
    password_hash: 'extbd123',
    role: 'EXTERNAL_BD',
    department: 'External Partner Network',
    phone: '9765432109',
    employee_id: 'EXT-BD-05'
  },
  {
    _id: 'usr-6',
    name: 'Anjali Deshmukh (Coordinator)',
    email: 'coordinator@sunriseschool.edu.in',
    password: 'coord123',
    password_hash: 'coord123',
    role: 'COORDINATOR',
    department: 'School Coordinator',
    phone: '9822123456',
    employee_id: 'CORD-SAT-06'
  },
  {
    _id: 'usr-7',
    name: 'Sujit Bhendarkar (Purchase Manager)',
    email: 'purchase@airginternational.com',
    password: 'pur123',
    password_hash: 'pur123',
    role: 'PURCHASE_MANAGER',
    department: 'Procurement & Inventory Operations',
    phone: '9822556677',
    employee_id: 'EMP-PUR-07'
  }
];
