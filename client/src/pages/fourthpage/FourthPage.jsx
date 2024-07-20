import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './fourthpage.css';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/footer/Footer';

export default function RadioButtonExample() {
    // State to track the selected option
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOption1, setSelectedOption1] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');

    // Event handlers to update the selected options
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleOptionChange1 = (event) => {
        setSelectedOption1(event.target.value);
    };

    const handleOptionChange2 = (event) => {
        setSelectedOption2(event.target.value);
    };

    // Dummy cost values based on selected options
    const transportationCost = {
        "1": 500,
        "2": 400,
        "3": 100,
        "4": 600,
        "5": 300,
        "6": 0
    };

    const accommodationCost = {
        "7": 2000,
        "8": 2500,
        "9": 3000,
        "10": 3500,
        "11": 4000,
        "12": 4500
    };

    const mealCost = {
        "13": 2000,
        "14": 3000,
        "15": 4000,
        "16": 4500,
        "17": 5000,
        "18": 6000
    };

    const totalCost = (transportationCost[selectedOption] || 0) + (accommodationCost[selectedOption1] || 0) + (mealCost[selectedOption2] || 0);

    return (

        <>
        <NavigationBar/>
        <div className='background'>

            <h2 className='fourthpagerow'><b>Plan Your Budget...</b></h2><br/>
            <p className='row2'>
                Show Estimated the cost of taxis, buses, or rental cars for getting around Sigiriya and nearby attractions by basing location.<br/>
                Remember, this cost can depend on your members. If you have a family or a few people this cost can change.<br/>
                This option gives a simple idea to manage your budget.
            </p>
            <h4 className='fourthpagerow'>Transportation:</h4><br/>
            <Row className='fourthpagerow'>
                <Col>
                    <label>By Uber</label><br/>
                    <label>By Pick Me</label><br/>
                    <label>By Bus</label><br/>
                    <label>By Rent a Car</label><br/>
                    <label>By Train</label><br/>
                    <label>By Your Vehicle</label><br/>
                </Col>
                <Col>
                    <input type="radio" value="1" checked={selectedOption === "1"} onChange={handleOptionChange} className='radio-mark' /><br/>
                    <input type="radio" value="2" checked={selectedOption === "2"} onChange={handleOptionChange} className='radio-mark' /><br/>
                    <input type="radio" value="3" checked={selectedOption === "3"} onChange={handleOptionChange} className='radio-mark' /><br/>
                    <input type="radio" value="4" checked={selectedOption === "4"} onChange={handleOptionChange} className='radio-mark' /><br/>
                    <input type="radio" value="5" checked={selectedOption === "5"} onChange={handleOptionChange} className='radio-mark' /><br/>
                    <input type="radio" value="6" checked={selectedOption === "6"} onChange={handleOptionChange} className='radio-mark' /><br/>
                </Col>
            </Row><br/>
            <h5 className='row1'>Your Transportation Cost is LKR {transportationCost[selectedOption] || 0}</h5>
            <br/><br/><br/>
            <h4 className='fourthpagerow'>Accommodation:</h4><br/>
            <Row className='fourthpagerow'>
                <Col>
                    <label>Hotel1</label><br/>
                    <label>Hotel2</label><br/>
                    <label>Hotel3</label><br/>
                    <label>Hotel4</label><br/>
                    <label>Hotel5</label><br/>
                    <label>Hotel6</label><br/>
                </Col>
                <Col>
                    <input type="radio" value="7" checked={selectedOption1 === "7"} onChange={handleOptionChange1} className='radio-mark' /><br/>
                    <input type="radio" value="8" checked={selectedOption1 === "8"} onChange={handleOptionChange1} className='radio-mark' /><br/>
                    <input type="radio" value="9" checked={selectedOption1 === "9"} onChange={handleOptionChange1} className='radio-mark' /><br/>
                    <input type="radio" value="10" checked={selectedOption1 === "10"} onChange={handleOptionChange1} className='radio-mark' /><br/>
                    <input type="radio" value="11" checked={selectedOption1 === "11"} onChange={handleOptionChange1} className='radio-mark' /><br/>
                    <input type="radio" value="12" checked={selectedOption1 === "12"} onChange={handleOptionChange1} className='radio-mark' /><br/>
                </Col>
            </Row><br/>
            <h5 className='row1'>Your Accommodation Cost is LKR {accommodationCost[selectedOption1] || 0}</h5>
            <br/><br/><br/>
            <h4 className='fourthpagerow'>Meal:</h4><br/>
            <Row className='fourthpagerow'>
                <Col>
                    <label>Meals per day LKR.2000.00</label><br/>
                    <label>Meals per day LKR.3000.00</label><br/>
                    <label>Meals per day LKR.4000.00</label><br/>
                    <label>Meals per day LKR.4500.00</label><br/>
                    <label>Meals per day LKR.5000.00</label><br/>
                    <label>Meals per day LKR.6000.00</label><br/>
                </Col>
                <Col>
                    <input type="radio" value="13" checked={selectedOption2 === "13"} onChange={handleOptionChange2} className='radio-mark' /><br/>
                    <input type="radio" value="14" checked={selectedOption2 === "14"} onChange={handleOptionChange2} className='radio-mark' /><br/>
                    <input type="radio" value="15" checked={selectedOption2 === "15"} onChange={handleOptionChange2} className='radio-mark' /><br/>
                    <input type="radio" value="16" checked={selectedOption2 === "16"} onChange={handleOptionChange2} className='radio-mark' /><br/>
                    <input type="radio" value="17" checked={selectedOption2 === "17"} onChange={handleOptionChange2} className='radio-mark' /><br/>
                    <input type="radio" value="18" checked={selectedOption2 === "18"} onChange={handleOptionChange2} className='radio-mark' /><br/>
                </Col>
            </Row><br/>
            <h5 className='row1'>Your Meal Cost is LKR {mealCost[selectedOption2] || 0}</h5><br/><br/>
            <h5 className='row3'>Your Total cost is LKR {totalCost}</h5><br/><br/>
            <p className='row2'>
                <b>Miscellaneous Expenses:</b><br/><br/>
                <b>If you wish to go shopping or visit extra places, you can add that cost to your total.</b><br/>
                <b>Some places charge extra for their services.</b><br/><br/>
                Please remember to bring extra cash or a debit/credit card for your trip.
            </p>
        </div>
        <Footer/>
        </>
    );
}
