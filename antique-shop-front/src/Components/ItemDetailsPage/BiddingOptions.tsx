import React from 'react';
import { Timer } from '../Timer/Timer';

interface BiddingOptionsProps {
    bid: number;
    currentBid: number;
    autoBidCheckbox: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    biddingItem: () => void;
    handleAutoBidCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    winner: boolean;
    biddingTimeLimit: any,
    setBiddingOver: (t: boolean) => void
}

export const BiddingOptions: React.FC<BiddingOptionsProps> = ({
    bid,
    currentBid,
    autoBidCheckbox,
    handleChange,
    biddingItem,
    handleAutoBidCheckboxChange,
    winner,
    biddingTimeLimit,
    setBiddingOver
}) => {
    return (
        <>  <div className="container mt-5">
            <h1 className="text-center">Time to Bid</h1>
            <div className="card mt-3 p-4">
                <div className="card-body">
                    <h5 className="card-title">Bidding Options</h5>
                    <div className="mb-3">
                        <label htmlFor="bidAmount" className="form-label">
                            Enter Bid Amount:
                        </label>
                        <div className="input-group">
                            <input type="number" className="form-control" id="bidAmount" value={bid} onChange={handleChange} />
                            <button type="button" className="btn btn-primary" onClick={biddingItem}>
                                Place Bid
                            </button>
                        </div>
                    </div>
                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" id="autoBidCheckbox" onChange={handleAutoBidCheckboxChange} checked={autoBidCheckbox} />
                        <label className="form-check-label" htmlFor="autoBidCheckbox">
                            Auto Bid
                        </label>
                    </div>
                    <h5>Lowest Asks: {currentBid}$</h5>
                    <h6>You are currently :  <span style={{ color: winner ? 'green' : 'red' }}>
                        {winner ? 'Winning' : 'Losing'}
                    </span> </h6>
                </div>
            </div>
            <div className="text-center mt-4 border p-3">
                <Timer biddingTimeLimit={biddingTimeLimit} setBiddingOver={setBiddingOver} />
            </div>
        </div>
        </>
    );
};
