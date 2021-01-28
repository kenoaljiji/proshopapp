import React from 'react'
import  { Helmet } from 'react-helmet'

const Meta = ({title, description, keywords}) => {
    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <meta name='description' content={description}/>
                <meta name='keyword' content={keywords}/>
            </Helmet>
        </div>
    )
}

Meta.defaultProps = {
    title: 'Welcome to ProShop',
    description:'We sell the best products for cheap',
    keywords: 'electronics, buy electreonics , cheap electronics'
}
               
export default Meta
