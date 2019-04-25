import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Layout from './../components/layout'
import { Banner } from './../components/banner'
import HomeNav from './../components/HomeNav'
import HomeContent from './../components/HomeContent'

//this is my template for CMS:::
//to access child component, parent component
//has to be accessible.
export const HomePageTemplate = ({ bannerData }) => {
  const bannerEnabled = bannerData.bannerEnabled
  return (
    <>
      {bannerEnabled && <Banner bannerData={bannerData} />}
      <div id="main">
        <HomeNav />
        <HomeContent />
      </div>
    </>
  )
}

//define custom data object from graphQL
HomePageTemplate.propTypes = {
  bannerData: PropTypes.object,
}

//this is my component:::
const HomeIndex = ({ data }) => {
  //store data as markdownRemarks: post
  const { markdownRemark: post } = data

  //post.frontmatter to access data object:::
  return (
    <Layout contactEnabled={true}>
      <Helmet
        title="Gatsby Starter - Forty"
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
      <HomePageTemplate bannerData={post.frontmatter} />
    </Layout>
  )
}

//assign frontmatter content as a data prop
HomeIndex.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default HomeIndex

//find the data for child component
//query for layout component to pass down to footer
export const homeQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index" } }) {
      frontmatter {
        bannerEnabled
        bannerTitle
        bannerText
      }
    }
  }
`
