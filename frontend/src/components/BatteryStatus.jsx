import React, { useState, useEffect } from 'react';
import "./BatteryStatus.css";

const BatteryStatus = () => {
    const [batteryLevel, setBatteryLevel] = useState(100);
    const [isCharging, setIsCharging] = useState(false);
    const [chargingTime, setChargingTime] = useState(null);
    const [dischargingTime, setDischargingTime] = useState(null);

    useEffect(() => {
        let battery;

        async function fetchBatteryInfo() {
            try {
                battery = await navigator.getBattery();
                updateBatteryInfo(battery);

                // Set event listeners for battery status changes
                battery.addEventListener('levelchange', () => updateBatteryInfo(battery));
                battery.addEventListener('chargingchange', () => updateBatteryInfo(battery));
                battery.addEventListener('chargingtimechange', () => updateBatteryInfo(battery));
                battery.addEventListener('dischargingtimechange', () => updateBatteryInfo(battery));
            } catch (error) {
                console.error('Battery API not supported or available:', error);
            }
        }

        function updateBatteryInfo(battery) {
            setBatteryLevel(battery.level * 100);
            setIsCharging(battery.charging);
            setChargingTime(battery.chargingTime);
            setDischargingTime(battery.dischargingTime);
        }

        fetchBatteryInfo();

        // Cleanup event listeners on component unmount
        return () => {
            if (battery) {
                battery.removeEventListener('levelchange', updateBatteryInfo);
                battery.removeEventListener('chargingchange', updateBatteryInfo);
                battery.removeEventListener('chargingtimechange', updateBatteryInfo);
                battery.removeEventListener('dischargingtimechange', updateBatteryInfo);
            }
        };
    }, []);

    // Determine color based on battery level
    const batteryColor = batteryLevel > 20 ? 'text-green-600' : 'text-red-600';

    return (
        <div className="flex flex-col items-center p-4 border rounded-md">
            <div className="flex justify-between w-full">
                <span>Battery Level:</span>
                <span className={`${batteryColor} font-bold`}>{batteryLevel.toFixed(0)}%</span>
            </div>
            <div className="flex justify-between w-full">
                <span>Status:</span>
                <span className="font-bold">
                    {isCharging ? 'Charging ⚡' : 'Discharging'}
                </span>
            </div>
            {isCharging && chargingTime !== Infinity && (
                <div className="flex justify-between w-full">
                    <span>Charging Time:</span>
                    <span className="font-bold">{chargingTime} seconds</span>
                </div>
            )}
            {!isCharging && dischargingTime !== Infinity && (
                <div className="flex justify-between w-full">
                    <span>Discharging Time:</span>
                    <span className="font-bold">{dischargingTime} seconds</span>
                </div>
            )}
        </div>
    );
};

export default BatteryStatus;
