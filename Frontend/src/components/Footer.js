import styled from 'styled-components'


const Container = styled.div`
	background-color: black;
	height: auto;
	color: white;
	padding: 60px 0 10px 0;
    text-align: center;
	h1 {
		margin: 0;
		font-family: 'Times New Roman', Times, serif;
    font-size: 30px;
	}
  /* margin-bottom: 20px; */
`

const Footer = () => {
    return (
        <Container>
        <h1>BPOP</h1>
    </Container>
    )
  }
  
export default Footer;