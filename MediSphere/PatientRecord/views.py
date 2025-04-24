from django.shortcuts import render, redirect
from .forms import PatientRecordForm
from .models import PatientRecord
from django.contrib.auth.decorators import login_required

@login_required
def upload_record(request):
    if request.method == 'POST':
        form = PatientRecordForm(request.POST, request.FILES)
        if form.is_valid():
            record = form.save(commit=False)
            record.user = request.user
            record.save()
            return redirect('my_records')  # Redirect to user’s records page
    else:
        form = PatientRecordForm()
    return render(request, 'PatientRecord/upload_record.html', {'form': form})

@login_required
def my_records(request):
    records = PatientRecord.objects.filter(user=request.user)
    return render(request, 'PatientRecord/my_records.html', {'records': records})

from django.shortcuts import get_object_or_404
from django.contrib import messages

@login_required
def delete_record(request, record_id):
    record = get_object_or_404(PatientRecord, id=record_id, user=request.user)
    if request.method == 'POST':
        record.delete()
        messages.success(request, "Record deleted successfully!")
        return redirect('my_records')
    return render(request, 'confirm_delete.html', {'record': record})
