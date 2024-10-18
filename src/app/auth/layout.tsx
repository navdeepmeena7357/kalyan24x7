import Image from "next/image"

export default function AuthLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
         <div>
    
     
          <div className="flex items-center p-4 justify-center" >
            
             <Image src='/images/png/logo_vertical.png' width={180} height={56} alt="Kalyan 777 Logo"/>

          </div>


         </div>
        {children}
      </section>
    )
  }