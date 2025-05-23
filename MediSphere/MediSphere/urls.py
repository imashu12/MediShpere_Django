"""
URL configuration for MediSphere project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from . import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.home,name='home'),
    path("auth/",include("accounts.urls")),
    path('accounts/',include('allauth.urls')),
    path('payment/',include('payment.urls')),
    path('about_us/',views.about_us,name="about_us"),
    path('contact/',views.contact_us,name="contact"),
    path('records/',views.records,name="records"),
    path('api/search-bloodbanks/', views.search_blood_banks, name='search_bloodbanks'),
    path('search-blood/', views.render_search_blood_banks, name='search_blood'),
    path('patient-record/', include('PatientRecord.urls')),
    path('hospitals/', views.hospitals_view, name='hospitals'),
   


   
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
