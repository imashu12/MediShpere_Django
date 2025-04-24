from django.urls import path
from . import views

urlpatterns = [
    path('upload-record/', views.upload_record, name='upload_record'),
    path('my-records/', views.my_records, name='my_records'),
    path('delete-record/<int:record_id>/', views.delete_record, name='delete_record')
]