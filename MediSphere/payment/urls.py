from django.urls import path
from . import views


urlpatterns = [
    path('',views.pay,name='pay'),  
    path('create_payment/', views.create_payment, name='create_payment'),
]
