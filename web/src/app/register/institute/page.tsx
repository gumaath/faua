import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";
import FormRegisterInstitute from "@/components/FormRegisterInstitute/page";

export default function Register() {
  return (
    <div>
      <div className="min-h-screen select-text">
        <Header/>
        <FormRegisterInstitute/>
      </div>
      <Footer/>
    </div>
  )
}
