import React from 'react';
import AssessmentIcon from '@mui/icons-material/Assessment';
import {useNavigate} from "react-router-dom";


const ReportPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <h1 className="lg:text-8xl sm:text-4xl text-white font-bold text-center my-4">All Reports</h1>

            <div className="flex flex-col items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">

                    <button
                        className="w-full lg:py-14 sm:py-7 my-4 border-4 text-2xl sm:text-3xl
                         md:text-4xl lg:text-5xl text-white bg-gradient-to-r from-blue-500 to-green-500
                          rounded-lg hover:from-blue-600 hover:to-green-600"
                        onClick={() => navigate('/salesReportPage')}
                        variant="contained"
                    >
                        Sales Report <AssessmentIcon className="" />
                    </button>

                    <button
                        className="w-full lg:py-14 sm:py-7 my-4 border-4 text-2xl sm:text-3xl
                         md:text-4xl lg:text-5xl text-white bg-gradient-to-r from-blue-500 to-green-500
                          rounded-lg hover:from-blue-600 hover:to-green-600"
                        onClick={() => navigate('/itemReportPage')}
                        variant="contained"
                    >
                         Item Report <AssessmentIcon className="" />
                    </button>
                </div>
            </div >
        </>
    );
}

export default ReportPage;
