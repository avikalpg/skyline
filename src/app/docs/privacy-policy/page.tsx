import SingleFoldPageUIWrapper from "src/components/SingleFoldPageUIWrapper";
import { Box, Typography } from '@mui/joy';
import ScrollPageUIWrapper from "src/components/ScrollPageUIWrapper";

export default function PrivacyPolicy() {
	return (
		<ScrollPageUIWrapper>
			<Box sx={{ mt: { xs: 2, sm: 4 }, maxWidth: '1200px', mx: 'auto', px: { xs: 2, sm: 4, md: 8 } }}>
				<Box sx={{ maxWidth: '800px' }}>
					<Typography level="h1" sx={{ mb: 4 }}>
						Privacy Policy
					</Typography>
				</Box>

				<Box sx={{ mt: 4 }}>
					<Typography>
						This privacy policy sets out how AVIKALPKUMAR ALOK GUPTA uses and protects any information that you give AVIKALPKUMAR ALOK GUPTA when you visit their website and/or agree to purchase from them. AVIKALPKUMAR ALOK GUPTA is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, and then you can be assured that it will only be used in accordance with this privacy statement. AVIKALPKUMAR ALOK GUPTA may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you adhere to these changes.
					</Typography>

					<Typography level="h2" sx={{ mt: 4, mb: 2 }}>Information Collection</Typography>
					<Typography>We may collect the following information:</Typography>
					<Box component="ul" sx={{ pl: 4 }}>
						<li><Typography>Name</Typography></li>
						<li><Typography>Contact information including email address</Typography></li>
						<li><Typography>Demographic information such as postcode, preferences and interests, if required</Typography></li>
						<li><Typography>Other information relevant to customer surveys and/or offers</Typography></li>
					</Box>

					<Typography level="h2" sx={{ mt: 4, mb: 2 }}>What we do with the information we gather</Typography>
					<Typography>We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:</Typography>
					<Box component="ul" sx={{ pl: 4 }}>
						<li><Typography>Internal record keeping.</Typography></li>
						<li><Typography>We may use the information to improve our products and services.</Typography></li>
						<li><Typography>We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.</Typography></li>
						<li><Typography>From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax or mail.</Typography></li>
						<li><Typography>We may use the information to customise the website according to your interests.</Typography></li>
					</Box>

					<Typography level="h2" sx={{ mt: 4, mb: 2 }}>How we use cookies</Typography>
					<Typography>
						A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyze web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.
					</Typography>
					<Typography>
						We use traffic log cookies to identify which pages are being used. This helps us analyze data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system. Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us. You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.
					</Typography>

					<Typography level="h2" sx={{ mt: 4, mb: 2 }}>Controlling your personal information</Typography>
					<Typography>
						You may choose to restrict the collection or use of your personal information in the following ways: whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes if you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us at support@skyline3d.in
					</Typography>
					<Typography>
						We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about third parties which we think you may find interesting if you tell us that you wish this to happen.
					</Typography>
					<Typography>
						If you believe that any information we are holding on you is incorrect or incomplete, please write to support@skyline3d.in or contact us at 7021803109 as soon as possible. We will promptly correct any information found to be incorrect.
					</Typography>
				</Box>
			</Box>
		</ScrollPageUIWrapper>
	);
}
