export type Item = {
  color: string;
  category: string;
  emoji: string;
  budget: number;
};

export type Category = {
  id: number;
  CategoryItem: CategoryItem[];
  color: string;
  name: string;
  icon: string;
  assigned_budget: number;
  created_at: string;
}

export type CategoryItem = {
  category_id: number;
  color: string;
  cost: number;
  created_at?: string;
  icon:string;
  id?:number
  image:string;
  name: string
  note: string;
  url:string;
}

export type dataPieChart = {
  id: number;
  value: number;
  label: string;
}