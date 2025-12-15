import React from 'react';
import { FaShare } from 'react-icons/fa';
import { FacebookShareButton,TwitterShareButton,TelegramShareButton,WhatsappShareButton,FacebookIcon,TwitterIcon,TelegramIcon,WhatsappIcon} from 'react-share';

const Share = ({ lesson }) => {
    const shareUrl = window.location.href;
    const shareTitle = `Check out this life lesson: ${lesson.title}`;
    // share
    const handleShare = () => {
        document.getElementById('my_modal_5').showModal()
    };
    return (
        <div>
            <button
                onClick={handleShare}
                className="btn btn-sm btn-outline"><FaShare size={18} />
                Share</button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h2 className='text-center font-bold text-2xl mb-4'>Share your thoughts on social media!</h2>
                    <div className="text-center space-x-6">
                        {/* Facebook */}
                        <FacebookShareButton
                            url={shareUrl}
                            quote={shareTitle}
                        >
                            <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>

                        {/* Twitter */}
                        <TwitterShareButton
                            url={shareUrl}
                            title={shareTitle}
                        >
                            <TwitterIcon size={32} round={true} />
                        </TwitterShareButton>

                        {/* Telegram */}
                        <TelegramShareButton
                            url={shareUrl}
                            title={shareTitle}
                        >
                            <TelegramIcon size={32} round={true} />
                        </TelegramShareButton>

                        {/* WhatsApp */}
                        <WhatsappShareButton
                            title={shareTitle}
                            url={shareUrl}
                        >
                            <WhatsappIcon size={32} round={true} />
                        </WhatsappShareButton>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Share;