import Document, { Html, Head, Main, NextScript } from 'next/document';


class MyDocument extends Document{
    render(){
        return(
            <Html lang='en'>
                <Head>
                    <meta name='description' content="Jonathan Buttigieg E-commerce website with nextjs and typescript" />
                    
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument