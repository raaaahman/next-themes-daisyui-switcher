export default function Home() {
  return (
    <main className="min-h-screen p-24 bg-base-300 text-base-content">
      <section className='grid lg:gap-x-4 gap-y-4 lg:grid-cols-2 xl:grid-cols-3'>
        <h2 className='text-3xl lg:col-span-2 xl:col-span-3'>Latest Posts</h2>
        {new Array(6).fill(undefined).map(
          (_, index) => (<article key={index} className='card card-bordered border-neutral-content dark:border-neutral card-side bg-base-100 shadow-lg shadow-gray-400 dark:shadow-black'>
            <figure>
              <img className="h-full" alt="lorem picsum" src="https://picsum.photos/300/200" />
            </figure>
            <div className='card-body'>
              <h3 className='card-title'>Lorem Ipsum</h3>
              <p>Lorem ipsum dolor sit amet ...</p>
              <div className='card-actions justify-between items-end'>
                <div className="flex flex-wrap">
                  <span className='badge badge-outline mx-2'>Javascript</span>
                  <span className='badge badge-outline'>React</span>
                </div>
                <button className='btn btn-primary text-lg font-bold'>Lire</button>
              </div>
            </div>
          </article>)
        )}
        
      </section>
      
    </main>
  )
}
