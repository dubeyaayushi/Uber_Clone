import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CapatainContext'
import axios from 'axios'

const CaptainHome = () => {

    const [ ridePopupPanel, setRidePopupPanel ] = useState(false)
    const [ confirmRidePopupPanel, setConfirmRidePopupPanel ] = useState(false)

    const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)
    const [ ride, setRide ] = useState(null)

    const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)

    useEffect(() => {
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        })
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {

                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()

        // return () => clearInterval(locationInterval)
    }, [])

    socket.on('new-ride', (data) => {

        setRide(data)
        setRidePopupPanel(true)

    })

    async function confirmRide() {

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

            rideId: ride._id,
            captainId: captain._id,


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        setRidePopupPanel(false)
        setConfirmRidePopupPanel(true)

    }


    useGSAP(function () {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ ridePopupPanel ])

    useGSAP(function () {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ confirmRidePopupPanel ])

    return (
        <div className='h-screen'>
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-3/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

            </div>
            <div className='h-2/5 p-6'>
                <CaptainDetails />
            </div>
            <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <RidePopUp
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    confirmRide={confirmRide}
                />
            </div>
            <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <ConfirmRidePopUp
                    ride={ride}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
            </div>
        </div>
    )
}

export default CaptainHome


/* ✅ Top-Level Functional Summary
This page is the Captain (Driver) Home screen for your ride-sharing app.

It tracks the captain’s location and sends it to the server via socket.

It receives new ride requests via WebSocket (socket.on('new-ride')) and shows them with an animation.

It confirms a ride, hides the popup, and shows the confirmation panel using GSAP animations.

🧩 Total <div> Count: 7
Let’s break them down in hierarchical order:

🔵 <div className='h-screen'> (Main parent wrapper)
📌 Role: The entire page is wrapped inside this. Sets full screen height.

Children: 6 direct child <div>s inside this one.

1️⃣ Topbar <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
Role: Shows the Uber logo and logout button at the top.

Children:

Uber logo <img>

<Link> (Logout icon)

2️⃣ Image Section <div className='h-3/5'>
Role: Shows a full-width top animation/image.

Children:

<img> – background animation of a car driving.

3️⃣ Captain Details Section <div className='h-2/5 p-6'>
Role: Displays the captain's profile or details.

Children:

<CaptainDetails /> component

4️⃣ Ride Popup Panel (Animated) <div ref={ridePopupPanelRef} ...>
Role: A sliding panel that shows a new incoming ride.

📦 Uses GSAP to animate it in from bottom (translateY).

Children:

<RidePopUp /> — this shows the incoming ride details, accept/cancel buttons.

5️⃣ Confirm Ride Panel (Animated) <div ref={confirmRidePopupPanelRef} ...>
Role: After confirming a ride, this panel slides up.

📦 Also animated with GSAP.

Children:

<ConfirmRidePopUp /> — displays confirmed ride details.

6️⃣ (Inside RidePopUp or ConfirmRidePopUp)
These are nested inside components, so not directly part of this file, but their inner divs are part of the rendered DOM.

📚 Summary Table
Div Index	Class / Ref	Purpose	Children
1	h-screen	Wraps entire Captain Home page	6 child divs
2	fixed p-6 top-0 ...	Top bar (logo + logout)	<img> + <Link>
3	h-3/5	Animated image section	<img>
4	h-2/5 p-6	Shows captain info	<CaptainDetails />
5	ref={ridePopupPanelRef} ...	Slide-in Ride popup panel	<RidePopUp />
6	ref={confirmRidePopupPanelRef} ...	Slide-in Confirmed ride panel	<ConfirmRidePopUp />

🎬 Animation Summary
ridePopupPanelRef and confirmRidePopupPanelRef divs slide up/down using GSAP animations depending on boolean states (ridePopupPanel and confirmRidePopupPanel). */