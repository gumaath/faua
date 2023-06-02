import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";
import FormRegister from "@/components/FormRegister/page";

export default function Home() {
  return (
    <div>
      <div className="h-screen select-text">
        <Header/>
        <FormRegister/>
      </div>
      <Footer/>
    </div>
  )
}
