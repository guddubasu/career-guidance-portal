import ShowScholarship from "./ShowScholarship";
export default function PrivateScholarships(){
    return (
        <div  style={{marginBottom:"2rem"}}>
            <h1 style={{textAlign:"left",
            marginLeft:"5.3rem",
            color:"#196cbfff",
            }}>Private Scholarship</h1>
            <ShowScholarship src="https://www.buddy4study.com/page/technip-energies-india-scholarship-program?ref=AllScholarship" name="Technip Energies India Scholarship Program 2022-23"/>
            <ShowScholarship src="https://www.vidyadhan.org/apply" name="Vidyadhan Scholarship Program from Sarojini Damodaran Foundation"/>
            <ShowScholarship src="https://www.samsung.com/in/microsite/sapne-hue-bade/" name="Samsung Star Scholar Program"/>
            <ShowScholarship src="https://www.buddy4study.com/page/nikon-scholarship-program" name="Nikon Scholarship Program"/>
            <ShowScholarship src="https://www.vidhyaa.in/scholarship/baba-gurbachan-singh-scholarship-scheme" name="Baba Guru Bachan Singh Scholarship Scheme"/>
            <ShowScholarship src="https://iocl.com/Scholarships" name="Indian Oil Educational Scholarship"/>
            <ShowScholarship src="https://www.buddy4study.com/page/keep-india-smiling-foundational-scholarship-programme?ref=featuredBlocks" name="Keep India Smiling Foundational Scholarship & Mentorship Programme"/>
        </div>
    );
}