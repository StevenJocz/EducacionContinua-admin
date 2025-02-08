import { Home } from "@/components/home"
import { Nav } from "@/components/nav";

const Dashboard = () => {
  const theme: 'dark' | 'light' = 'light';
  return (
    <>
      <Nav theme={theme}/>
      <Home />
    </>

  )
}

export default Dashboard