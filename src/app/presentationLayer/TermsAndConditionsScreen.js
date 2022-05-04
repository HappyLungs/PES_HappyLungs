import React , { useState } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';


import COLORS from "../config/stylesheet/colors";

const { width , height } = Dimensions.get('window');

function TermsAndConditionsScreen({ navigation, route }) {
    
    const [state, setState] = useState (false);

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
    };
  
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Terms and conditions</Text>
            <ScrollView 
            style={styles.tcContainer}
            onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                    setState(true)
                }
            }}
            >
                <Text style={styles.normalText}>Welcome to Happy Lungs!</Text>
                <Text style={styles.normalText}>These terms and conditions outline the rules and regulations for the use of Happy Lungs's App.</Text>
                <Text style={styles.normalText}>By accessing this website we assume you accept these terms and conditions. Do not continue to use Happy Lungs if you do not agree to take all of the terms and conditions stated on this app.</Text>
                <Text style={styles.normalText}>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</Text>
                <Text style={styles.subTitle}>License</Text>
                <Text style={styles.normalText}>Unless otherwise stated, Happy Lungs and/or its licensors own the intellectual property rights for all material on Happy Lungs. All intellectual property rights are reserved. You may access this from Happy Lungs for your own personal use subjected to restrictions set in these terms and conditions.</Text>
                <Text style={styles.normalText}>You must not: -Republish material from Happy Lungs -Sell, rent or sub-license material from Happy Lungs -Reproduce, duplicate or copy material from Happy Lungs -Redistribute content from Happy Lungs</Text>
                <Text style={styles.normalText}>Parts of this app offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Happy Lungs does not filter, edit, publish or review Comments prior to their presence on the app. Comments do not reflect the views and opinions of Happy Lungs,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Happy Lungs shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this app.</Text>
                <Text style={styles.normalText}>Happy Lungs reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</Text>
                <Text style={styles.normalText}>You warrant and represent that: You are entitled to post the Comments on our website and have all necessary licenses and consents to do so; The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy; The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</Text>
                <Text style={styles.normalText}>You hereby grant Happy Lungs a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</Text>
                <Text style={styles.subTitle}>Hyperlinking to our Content</Text>
                <Text style={styles.normalText}>The following organizations may link to our Website without prior written approval: Government agencies; Search engines; News organizations; Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</Text>
                <Text style={styles.normalText}>These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.</Text>
                <Text style={styles.normalText}>We may consider and approve other link requests from the following types of organizations: commonly-known consumer and/or business information sources; dot.com community sites; associations or other groups representing charities; online directory distributors; internet portals; accounting, law and consulting firms; and educational institutions and trade associations.</Text>
                <Text style={styles.normalText}>We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Happy Lungs; and (d) the link is in the context of general resource information.</Text>
                <Text style={styles.normalText}>These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site.</Text>
                <Text style={styles.normalText}>If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to Happy Lungs. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.</Text>
                <Text style={styles.normalText}>Approved organizations may hyperlink to our Website as follows: By use of our corporate name; or By use of the uniform resource locator being linked to; or By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site.</Text>
                <Text style={styles.normalText}>No use of Happy Lungs's logo or other artwork will be allowed for linking absent a trademark license agreement.</Text>
                <Text style={styles.subTitle}>iFrames</Text>
                <Text style={styles.normalText}>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</Text>
                <Text style={styles.subTitle}>Content Liability</Text>
                <Text style={styles.normalText}>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</Text>
                <Text style={styles.subTitle}>Reservation of Rights</Text>
                <Text style={styles.normalText}>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</Text>
                <Text style={styles.subTitle}>Removal of links from our website</Text>
                <Text style={styles.normalText}>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</Text>
                <Text style={styles.normalText}>We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</Text>
                <Text style={styles.subTitle}>Disclaimer</Text>
                <Text style={styles.normalText}>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will: limit or exclude our or your liability for death or personal injury; limit or exclude our or your liability for fraud or fraudulent misrepresentation; limit any of our or your liabilities in any way that is not permitted under applicable law; or exclude any of our or your liabilities that may not be excluded under applicable law.</Text>
                <Text style={styles.normalText}>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</Text>
                <Text style={styles.normalText}>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</Text>                    
                    
            </ScrollView>

            <TouchableOpacity disabled={ !state } onPress={() => navigation.navigate('SignUpScreen')} style={ state ? styles.button : styles.buttonDisabled }><Text style={styles.buttonLabel}>Accept</Text></TouchableOpacity>
        </View>
    );

};

const styles = {

  container:{
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  title: {
      fontSize: 22,
      alignSelf: 'center'
  },
  normalText: {
      marginTop: 10,
      marginBottom: 10,
      fontSize: 12
  },
  subTitle:{
      marginLeft: 10,
      marginTop: 10,
      marginBottom: 10,
      fontSize: 16,
      fontWeight: "bold"
  },
  tcContainer: {
      marginTop: 15,
      marginBottom: 15,
      height: height * .7
  },

  button:{
      backgroundColor: COLORS.green1,
      borderRadius: 5,
      padding: 10
  },

  buttonDisabled:{
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10
 },

  buttonLabel:{
      fontSize: 14,
      color: '#FFF',
      alignSelf: 'center'
  }

}

export default TermsAndConditionsScreen;