import React from 'react';
import Container from '../Container';
import logo from '../../../assets/logo.png'
import { FaFacebookF } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io5";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
    return (
        <div className='bg-red-400'>
            <Container>
                <footer className="footer sm:footer-horizontal text-base-content p-10">
                    <aside>
                        <img src={logo} alt="" className='w-15' />
                        <span className={'text-[#02a2a2] font-bold text-xl'}>Wisdom<span className='text-primary'>Cell</span> </span>
                        <p>
                            Providing reliable lessons since 2008
                        </p>
                    </aside>
                    <nav>
                        <h6 className="footer-title">Services</h6>
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Company</h6>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Legal</h6>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Social</h6>
                        <div className="grid grid-flow-col gap-4">
                            <a href="https://x.com/" target="_blank" className="link link-hover">
                                <BsTwitterX size={30} color="blue" />
                            </a>
                            <a href="https://www.youtube.com/" target="_blank" className="link link-hover">
                                <IoLogoYoutube size={30} color="blue" />
                            </a>
                            <a href="https://www.facebook.com/" target="_blank" className="link link-hover">
                                <FaFacebookF size={30} color="blue" />
                            </a>
                        </div>
                    </nav>

                </footer>
            </Container>
        </div>
    );
};

export default Footer;