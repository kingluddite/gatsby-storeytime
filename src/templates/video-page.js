import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Layout from './../components/layout'
import { VideoList } from './../components/videolist'

//this is my template for CMS:::
//to access child component, parent component
//has to be accessible.
export const VideoPageTemplate = ({ videoListData }) => {
  return (
    <>
      <section
        className="section section--gradient"
        style={{ paddingTop: '2rem' }}
      >
        <VideoList videoListData={videoListData} />
      </section>
    </>
  )
}

//define custom data object from graphQL
VideoPageTemplate.propTypes = {
  videoListData: PropTypes.object,
}

//this is my component:::
const VideoPage = ({ data }) => {
  //store data as markdownRemarks: post

  const { markdownRemark: post } = data

  //post.frontmatter to access data object:::
  return (
    <Layout contactEnabled={true}>
      <Helmet title={'Videos : ' + `${data.site.siteMetadata.title}`}>
        <meta
          name="description"
          content={`${data.site.siteMetadata.description}`}
        />
      </Helmet>
      <VideoPageTemplate videoListData={post.frontmatter} />
    </Layout>
  )
}

//assign frontmatter content as a data prop
VideoPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default VideoPage

//find the data for child component
export const videoListQuery = graphql`
  query VideoTemplate {
    site {
      siteMetadata {
        title
        description
      }
    }
    markdownRemark(frontmatter: { templateKey: { eq: "video-page" } }) {
      frontmatter {
        videos {
          videoTitle
          videoLink
        }
      }
    }
  }
`
