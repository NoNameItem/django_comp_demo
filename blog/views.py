from django.shortcuts import render
from django.http import HttpResponseRedirect
from blog.models import BlogEntry


def entries(request):
    blog_entries_list = BlogEntry.objects.order_by('-created_dt')
    context = {
        'blog_entries_list': blog_entries_list
    }
    return render(request, 'blog/main.html', context)


def edit_entry(request, entry_id):
    blog_entry = BlogEntry.objects.filter(id=entry_id)
    context = {
        'blog_entry': blog_entry[0]
    }
    return render(request, 'blog/edit.html', context)


def save_entry(request, entry_id):
    content = request.POST['editor_data']
    BlogEntry.objects.filter(id=entry_id).update(content=content)
    blog_entry = BlogEntry.objects.filter(id=entry_id)
    context = {
        'blog_entry': blog_entry[0]
    }
    return HttpResponseRedirect(redirect_to="/blog/entries/" + str(entry_id))
