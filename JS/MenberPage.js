const sectionElement = document.querySelector("section");
const members = [
    {
        image: ['NVH1.jpg', 'NVH2.jpg'],
        hoTen: 'Nguyễn Văn Hiếu',
        mssv: '20000175',
        lop: 'DHKTPM16A'
    },
    {
        image: ['HAT1.jpg', 'HAT1.jpg'],
        hoTen: 'Hà Anh Thảo',
        mssv: '20001575',
        lop: 'DHKTPM16B'
    },
    {
        image: ['NDT1.jpg', 'NDT2.jpg'],
        hoTen: 'Nguyễn Đình Thanh',
        mssv: '20003005',
        lop: 'DHKHMT16A'
    },
    {
        image: ['NTHT1.jpg', 'NTHT2.jpg'],
        hoTen: 'Nguyễn Thị Hoài Thương',
        mssv: '20001595',
        lop: 'DHKTPM16B'
    },
    {
        image: ['NVTH1.jpg', 'NVTH2.jpg'],
        hoTen: 'Nguyễn Văn Thế Hoàng',
        mssv: '20003245',
        lop: 'DHHTTT16A'
    },
]
sectionElement.innerHTML =`<div class="box">
<div class="row no-gutters">
    ${members.map((member, index) => {
        let temp = '';

        if (index === 2)
            temp = '<div class="col col-xl-4 col-lg-4 col-md-3 col-sm-12 col-12 col-for-tablet"></div>';
        else if (index === 3)
            temp = '<div class="col col-xl-2 col-lg-2 col-md-0 col-sm-0 col-0"></div>';

        return `
        ${temp}
        <div class="col col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
            <div class="card">
                <div class="imgBox">
                    <img src="IMG/${member.image[0]}" alt="Menber 1">
                    <img src="IMG/${member.image[1]}" alt="Menber 2">
                </div>
                <div class="details">
                    <div class="content">
                        <h2>${member.hoTen}</h2>
                        <div class="row no-gutters" style="width: 100%;">
                            <div class="col col-xl-4 col-lg-4 col-md-5 col-sm-12 col-12">
                                <h3 class="group-field">MSSV:</h3>
                            
                            </div>
                            <div class="col col-xl-8 col-lg-8 col-md-7 col-sm-12 col-12">
                                <h3  class="group__info__field">${member.mssv}</h3>
                            </div>
                            <div class="col col-xl-4 col-lg-4 col-md-5 col-sm-12 col-12">
                                <h3 class="group-field">Lớp:</h3>
                            
                            </div>
                            <div class="col col-xl-8 col-lg-8 col-md-7 col-sm-12 col-12">
                                <h3 class="group__info__field">${member.lop}</h3>
                            </div>
                        </div>
                        <ul class="social__list">
                            <li class="social__item"><a href="https://www.facebook.com/" class="social__item__link">
                                <i class="fa-brands fa-facebook"></i>
                            </a></li>
                            <li class="social__item"><a href="https://twitter.com/?lang=vi" class="social__item__link">
                                <i class="fa-brands fa-twitter"></i>
                            </a></li>
                            <li class="social__item"><a href="https://www.linkedin.com/" class="social__item__link">
                                <i class="fa-brands fa-linkedin"></i>
                            </a></li>
                            <li class="social__item"><a href="https://www.instagram.com/" class="social__item__link">
                                <i class="fa-brands fa-instagram"></i>
                            </a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `
    }).join('')}
</div>`;

$('.header__navbar__item--member').addClass('active');