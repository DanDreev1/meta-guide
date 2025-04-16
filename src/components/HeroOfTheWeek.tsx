import Image from "next/image";

export default function HeroOfTheWeek() {
  return (
    <section className="flex flex-col md:flex-row gap-4 p-4 rounded-2xl bg-gray-900 text-white max-w-[1200px] w-full">
        {/* Картинка героя */}
        <div className="w-full md:min-w-[250px] md:w-[250px] h-[370px] bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
            <Image
            src="/meta-hero.png"
            alt="Герой недели"
            width={250}
            height={390}
            className="object-cover w-full h-full"
            />
        </div>

        {/* Контент */}
        <div className="flex flex-col justify-start flex-1 py-2 space-y-4">
            <div>
                <h2 className="text-2xl font-bold">Имя: Калея</h2>
                <h3 className="font-semibold text-lg mt-2">Коротко почему она здесь:</h3>
                <p className="text-base">Доминирует на роуме из-за баффа ульты</p>
            </div>

            {/* Сборка */}
            <div>
                <h4 className="font-semibold text-lg mb-2">Сборка</h4>

                {/* Мобильный: центрированный, фикс. ширины */}
                <div className="sm:hidden bg-[#075985] p-4 rounded-md w-[220px] mx-auto">
                    <div className="grid grid-cols-3 gap-2 justify-center">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <img
                        key={i}
                        src={`/meta-items/item${i}.png`}
                        alt={`Item ${i}`}
                        className="w-12 h-12 rounded-full object-cover mx-auto"
                        />
                    ))}
                    </div>
                </div>

                {/* Десктоп: слева, auto-width */}
                <div className="hidden sm:flex justify-start mt-2">
                    <div className="flex gap-2 bg-[#075985] p-2 rounded-md">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <img
                        key={i}
                        src={`/meta-items/item${i}.png`}
                        alt={`Item ${i}`}
                        className="w-12 h-12 rounded-full object-cover"
                        />
                    ))}
                    </div>
                </div>
            </div>

            {/* Эмблемы */}
            <div>
                <h4 className="font-semibold text-lg mb-2">Эмблемы</h4>

                {/* Мобильный */}
                <div className="sm:hidden bg-[#075985] p-4 rounded-md w-[220px] mx-auto">
                    <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4].map((i) => (
                        <img
                        key={i}
                        src={`/meta-emblems/emblem${i}.png`}
                        alt={`Emblem ${i}`}
                        className="w-12 h-12 rounded-full object-cover mx-auto"
                        />
                    ))}
                </div>
            </div>

            {/* Десктоп: слева, auto-width */}
            <div className="hidden sm:flex justify-start mt-2">
                <div className="flex gap-2 bg-[#075985] p-2 rounded-md">
                {[1, 2, 3, 4].map((i) => (
                    <img
                    key={i}
                    src={`/meta-emblems/emblem${i}.png`}
                    alt={`Emblem ${i}`}
                    className="w-12 h-12 rounded-full object-cover"
                    />
                ))}
                </div>
            </div>
            </div>


            {/* Подсказка */}
            <p className="text-sm text-gray-400 pt-2">
            Гайд на персонажа ищите во вкладке гайды в роуме
            </p>
        </div>
    </section>
  );
}
