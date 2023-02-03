import React from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import "./Pages.scss"
import MetaTags from 'react-meta-tags';
function AboutUs() {
  return (
    <div>
    <Header />
        <div className="page-section">
        <MetaTags>
            <title>About Us</title>
            <meta name="description" content="Let's start Shaping your career with us.." />
            <meta property="og:title" content="About Us" />
            <meta property="og:image" content="/banksterlogo.png" />
        </MetaTags>
        <h1>About Us</h1>
        <h2>Let's start Shaping your career with us.</h2>
        <p>
        Banksterindia.com a part of RALT INFOTECH PVT LTD, which is earlier known as "RALT HR SERVICES" is promoted by Mr. Trivesh Kumar, he is having 12+ Years of the vintage in the Service Industry. RALT INFOTECH comprises different entities that are into providing multiple services and facilities to our client Corporates and Individuals, providing a platform that takes care of your non-core functions and gives you the time and opportunity to focus on your core business activities. We provide specialized, integrated, and customized Services, Support, and Solutions to our clients and ensure the delivery of profitable propositions. We offer our clients a wealth of talent and a wide range of support through quality services. BanksterIndia possesses strong integration capabilities that are programmed to deliver the best in the industry. We believe in taking measured strides and strategic initiatives. RALT INFOTECH is ready to set new benchmarks in quality and commitments.
        </p>
        <p><b>Entities we have:</b></p>
        <h2>*BanksterIndia - A leading JOB Portal for Banking & Finance Professionals & Recruitment Services Provider.</h2>
        <p>Serving Since: 2012</p>
        <p><b>We believe in Quality, TAT, and Commitment.</b></p>
        <p>BanksterIndia Platform Where Job Seekers Can Find All Banking Jobs Update this is often the simplest application for college students or job seekers. BanksterIndia contents the banking job opening details in India. It provides a chance to succeed in a pool of individuals who are actively seeking employment within the banking sector in India.</p>
        <h2>Feature list -</h2>
        <p>1.	A one-click job search feature</p>
        <p>2.	The latest banking job list and one-click apply</p>
        <p>3.	Job Search And profile</p>
        <p>4.	Edit user info (4 options) (FRESHER / PROFESSIONAL)</p>
        <p>5.	Personal information (Name, Email, Mobile Number, Password, DOB, City, Gender, Marital status)</p>
        <p>6.	Education Details (Qualification, Course, University, passing year) +ADD</p>
        <p>7.	Experience Details (Company, Designation, start, and end date) + ADD</p>
        <p>8.	Job Details (Prefer location, key skills, language, Notice period, annual salary, total experience)</p>
        <p>9.	Upload resume</p>
        </div>

    <Footer />
    </div>
  )
}

export default AboutUs