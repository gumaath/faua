import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";
import FormLogin from "@/components/FormLogin/page";

export default function Home() {
  return (
    <div>
      <div className="h-screen select-text">
        <Header/>
        <FormLogin/>
      </div>
      <Footer/>
    </div>
  )
}
