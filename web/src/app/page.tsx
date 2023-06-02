import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";
import MainContent from "@/components/MainContent/page";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen select-text">
        <Header/>
        <MainContent/>
      </div>
      <Footer/>
    </div>
  )
}
