import React from 'react'
import { Helmet } from "react-helmet-async";

const Title = ({
  title = "ChatLoop - Stay in the loop — Chat in real time.",
  description = "This is a Real Time Chat application built with React, Node.js, and Socket.IO. It allows users to chat in real time, stay connected, and share messages seamlessly.",
}) => {
  return <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
  </Helmet>
}

export default Title
