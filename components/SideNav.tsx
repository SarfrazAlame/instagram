import { Home, Link } from "lucide-react"

const links = [
  {
    name:"Home",
    href:"/dasboard",
    icon:Home
  }
]


const SideNav = () => {
  return (
    <div>
      {links.map((item)=>(
         <Link 
         key={item.name}
         href={item.href}
         ic
         >

         </Link>
      ))}
    </div>
  ) 
}

export default SideNav  