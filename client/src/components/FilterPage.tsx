import { useRestaurantStore } from "@/store/useRestaurantStore";
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
export type FilterOptionsState={
  id:string;
  label:string;
}
const filteroptions:FilterOptionsState[]=[
  {
    id:"burger",
    label:"burger",
  },
  {
    id:"Combos",
    label:"Combos",
  },
  {
    id:"Thali",
    label:"Thali",
  },
  {
    id:"Bestsellers",
    label:"Bestsellers",
  },
];
const FilterPage = () => {
  const {setAppliedFilter,appliedFilter,resetAppliedFilter}=useRestaurantStore();
  const appliedfilterhandler=(value:string)=>{
    setAppliedFilter(value);
  }
  return (
    <div className="md:w-72">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Filter By Cuisines</h1>
        <Button variant={'link'} onClick={resetAppliedFilter}>Reset</Button>
      </div>
      {
        filteroptions.map((option)=>(
          <div key={option.id} className="flex items-center space-x-2 my-5">
            <Checkbox id={option.id} checked={appliedFilter.includes(option.label)}
            onClick={()=>appliedfilterhandler(option.label)}
            />
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{option.label}</Label>
          </div>
        ))
      }
    </div>
  )
}
export default FilterPage