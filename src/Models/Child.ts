import { Location } from "./Location";

export class Child
{
   
    $key:string;
    Name:string="";
    ParentNumber:string="";
    Age:number=null;
    HomeAddress:Location;
    SchoolName:string="";
    SchoolAddress:Location;
    CurrentLocation:Location;
    CounterDangerous:number=0;
    Timer:number=0;
}