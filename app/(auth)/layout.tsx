import React from 'react';

export default function layout({children, }: { children: React.ReactNode }) {

    return (
        
        <div className='h-full w-full flex pt-10 justify-center'>
            {children}
        </div>
    
        
    )

}
