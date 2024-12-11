import { FaTelegram, FaFacebook } from "react-icons/fa";
import QR from '../assets/qrcode.png'
function Footer() {
    return (
        <footer className="px-4 pt-4 bg-sky-700/50  ">
            <div className="max-w-screen-xl mx-auto  ">
                <div className="flex justify-between gap-6 text-white mb-6">
                    {/* Follow Khmer 24 Section */}
                    <div className="space-y-3">
                        <p className="text-sm">អនុវត្តតាមសិស្ស</p>
                        <div className="space-y-5">
                            <a href="#" className="flex items-center space-x-4">
                                <FaFacebook className='text-4xl text-white' />
                                <span>Facebook</span>
                            </a>
                            <a href="#" className="flex items-center space-x-4">
                                <FaTelegram className='text-4xl text-white' />
                                <span>Telegram</span>
                            </a>
                        </div>
                    </div>

                    {/* Customer Service Section */}
                    <div className="text-center space-y-4">
                        <p className="text-sm">សេវាកម្មអតិថិជន</p>

                        <p>  096 575 2080</p>
                        <p>   096 575 2080</p>
                    </div>

                    {/* Useful Information Section */}
                    <div className="text-center space-y-4">
                        <p className="text-sm">ព័ត៌មានដែលមានប្រយោជន៍</p>
                        <a href="#top" className="text-sm hover:underline">
                        គន្លឹះសុវត្តិភាព
                        </a>
                        <br />
                        <a href="#top" className="text-sm">
                        ច្បាប់នៃការផ្សព្វផ្សាយផលិតផល
                        បញ្ចេញមតិ
                        </a>
                    </div>

                    {/* App Download Section */}
                    <div className="text-center">
                        <p className="text-sm mb-4">ទាញយកកម្មវិធី ដោយឥតគិតថ្លៃ</p>
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <a href=""></a>
                            <img
                                src={QR}
                                alt="QR Code"
                                className="h-32"
                            />
                          
                        </div>
                    </div>
                </div>

                {/* Footer Image */}
                <img
                    className="w-full max-w-screen-xl mx-auto mt-6"
                    src="https://www.khmer24.com/icon/khmer24_footer.png"
                    alt="Footer"
                />
            </div>
        </footer>
    );
}

export default Footer;
