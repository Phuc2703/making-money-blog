 // Hiệu ứng loading khi trang tải
        document.addEventListener('DOMContentLoaded', function() {
            // Giả lập thanh loading
            let progress = 0;
            const loadingBar = document.getElementById('loadingBar');
            const interval = setInterval(function() {
                progress += 5;
                loadingBar.style.width = progress + '%';
                
                if (progress >= 100) {
                    clearInterval(interval);
                    loadingBar.style.opacity = '0';
                    setTimeout(() => {
                        loadingBar.style.display = 'none';
                    }, 300);
                }
            }, 50);
            
            // Cập nhật ngày hiện tại
            const today = new Date();
            const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
            document.getElementById('updateDate').textContent = formattedDate;
            
            // Tính thời gian đọc bài viết dựa trên số từ
            const articleContent = document.getElementById('articleContent').textContent;
            const wordCount = articleContent.split(/\s+/).length;
            const readTime = Math.ceil(wordCount / 200); // 200 từ/phút
            document.getElementById('readTime').textContent = readTime;
            
            // Thêm hiệu ứng khi cuộn trang
            window.addEventListener('scroll', handleScroll);
            
            // Thêm hiệu ứng hover cho logo
            const logo = document.getElementById('logo');
            logo.addEventListener('mouseover', function() {
                this.style.transform = 'scale(1.1)';
            });
            logo.addEventListener('mouseout', function() {
                this.style.transform = 'scale(1)';
            });

            // Highlight menu khi load trang
            highlightMenu();
        });
        
        // Xử lý cuộn trang
        function handleScroll() {
            const backToTop = document.getElementById('backToTop');
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
            
            // Hiệu ứng xuất hiện khi cuộn
            const webItems = document.querySelectorAll('.web-item');
            webItems.forEach((item, index) => {
                const itemPosition = item.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (itemPosition < screenPosition) {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 200);
                }
            });

            // Highlight menu khi scroll
            highlightMenu();
        }

        // Highlight menu khi scroll
        function highlightMenu() {
            const sections = document.querySelectorAll('.web-item');
            const menuLinks = document.querySelectorAll('.menu-link');
            
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            menuLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
        
        // Cuộn lên đầu trang
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Mở/rút gọn FAQ
        function toggleFAQ(element) {
            element.classList.toggle('active');
            const answer = element.nextElementSibling;
            answer.classList.toggle('show');
        }
        
        // Chia sẻ lên mạng xã hội
        function shareOnFacebook() {
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.getElementById('articleTitle').textContent);
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`, '_blank');
        }
        
        function shareOnTwitter() {
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.getElementById('articleTitle').textContent);
            window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
        }
        
        function shareOnLinkedIn() {
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.getElementById('articleTitle').textContent);
            window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`, '_blank');
        }
        
        function shareOnPinterest() {
            const url = encodeURIComponent(window.location.href);
            const description = encodeURIComponent(document.getElementById('articleTitle').textContent);
            const media = encodeURIComponent('https://via.placeholder.com/300x200?text=Web+Ki%E1%BA%BFm+Ti%E1%BB%81n');
            window.open(`https://pinterest.com/pin/create/button/?url=${url}&description=${description}&media=${media}`, '_blank');
        }
        
        // Xử lý khi click vào nút truy cập website
        function visitWebsite(websiteId, url) {
            const notification = document.getElementById('notification');
            notification.textContent = `Đang chuyển hướng đến ${document.getElementById(websiteId).querySelector('.web-name').textContent}...`;
            notification.classList.add('show');
            
            // Lưu lượt click vào localStorage
            let clicks = localStorage.getItem(websiteId) || 0;
            clicks++;
            localStorage.setItem(websiteId, clicks);
            
            // Mở website sau 2 giây
            setTimeout(() => {
                window.open(url, '_blank');
                notification.classList.remove('show');
            }, 2000);
        }
        
        // Hiệu ứng khi trang tải xong
        window.onload = function() {
            // Ẩn thanh loading
            document.getElementById('loadingBar').style.width = '100%';
            
            // Hiệu ứng xuất hiện cho các phần tử
            const elements = document.querySelectorAll('.web-item, .conclusion, .faq-item');
            elements.forEach((element, index) => {
                element.style.opacity = '0';
                element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                if (element.classList.contains('web-item')) {
                    element.style.transform = 'translateX(-50px)';
                } else {
                    element.style.transform = 'translateY(20px)';
                }
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateX(0) translateY(0)';
                }, index * 100 + 300);
            });
        }
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const mainNav = document.getElementById('mainNav');
            
            mobileMenuBtn.addEventListener('click', function() {
                mainNav.classList.toggle('active');
                this.innerHTML = mainNav.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });
            
            // Đóng menu khi click vào mục
            const navItems = document.querySelectorAll('.main-nav a');
            navItems.forEach(item => {
                item.addEventListener('click', function() {
                    if (window.innerWidth <= 768) {
                        mainNav.classList.remove('active');
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                });
            });
            
            // Highlight menu item khi scroll
            window.addEventListener('scroll', function() {
                const sections = document.querySelectorAll('section');
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (pageYOffset >= (sectionTop - 100)) {
                        current = section.getAttribute('id');
                    }
                });
                
                navItems.forEach(item => {
                    item.parentElement.classList.remove('active');
                    if (item.getAttribute('href') === `#${current}`) {
                        item.parentElement.classList.add('active');
                    }
                });
            });
        });
        // Thêm tính năng sắp xếp bảng (optional)
document.addEventListener('DOMContentLoaded', function() {
  const table = document.querySelector('.comparison-table');
  if (table) {
    const headers = table.querySelectorAll('th');
    headers.forEach((header, index) => {
      header.style.cursor = 'pointer';
      header.addEventListener('click', () => {
        sortTable(table, index);
      });
    });
  }
});

function sortTable(table, column) {
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));
  const isAsc = tbody.getAttribute('data-sort') === `asc-${column}`;

  rows.sort((a, b) => {
    const aText = a.cells[column].textContent.trim();
    const bText = b.cells[column].textContent.trim();
    return isAsc ? aText.localeCompare(bText) : bText.localeCompare(aText);
  });

  rows.forEach(row => tbody.appendChild(row));
  tbody.setAttribute('data-sort', isAsc ? `desc-${column}` : `asc-${column}`);
}
// Xử lý nút thêm đánh giá
document.getElementById('add-review-btn')?.addEventListener('click', () => {
  const name = prompt("Tên của bạn:");
  if (name) {
    const reviewText = prompt("Nhận xét của bạn:");
    const stars = prompt("Đánh giá (1-5 sao):");
    
    if (reviewText && stars) {
      addNewReview(name, reviewText, stars);
      alert("Cảm ơn đánh giá của bạn!");
    }
  }
});

function addNewReview(name, text, stars) {
  const reviewsGrid = document.querySelector('.reviews-grid');
  if (!reviewsGrid) return;

  const reviewCard = document.createElement('div');
  reviewCard.className = 'review-card';
  reviewCard.innerHTML = `
    <div class="reviewer-info">
      <img src="https://i.pravatar.cc/80?img=${Math.floor(Math.random() * 70)}" alt="User Avatar" class="avatar">
      <div class="reviewer-meta">
        <span class="name">${name}</span>
        <div class="stars">${'★'.repeat(stars)}${'☆'.repeat(5 - stars)} <span class="date">(${new Date().toLocaleDateString()})</span></div>
      </div>
    </div>
    <p class="review-text">"${text}"</p>
  `;

  reviewsGrid.prepend(reviewCard);
}
// Mobile Menu Functionality
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const headerContainer = document.querySelector('.header-container');
const navLinks = document.querySelectorAll('.nav-link');

mobileToggle?.addEventListener('click', () => {
  headerContainer.classList.toggle('mobile-active');
  document.body.style.overflow = headerContainer.classList.contains('mobile-active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (headerContainer.classList.contains('mobile-active')) {
      headerContainer.classList.remove('mobile-active');
      document.body.style.overflow = '';
    }
  });
});

// Smooth dropdown for mobile
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
  const link = dropdown.querySelector('.nav-link');
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 992) {
      e.preventDefault();
      const menu = dropdown.querySelector('.dropdown-menu');
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }
  });
});

// Sticky Header Effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.affiliate-header');
  if (window.scrollY > 10) {
    header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    header.style.background = 'rgba(255, 255, 255, 0.98)';
    header.style.backdropFilter = 'blur(5px)';
  } else {
    header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
    header.style.background = '#ffffff';
    header.style.backdropFilter = 'none';
  }
});
