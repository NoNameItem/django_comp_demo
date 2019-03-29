from django.db import models
from django.contrib.auth.models import User
import django


class BlogEntry(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Автор")
    title = models.CharField(max_length=50, null="", verbose_name="Заголовок")
    content = models.CharField(max_length=4000, verbose_name="Текст")
    created_dt = models.DateTimeField(default=django.utils.timezone.now, verbose_name="Дата создания")


class BlogComment(models.Model):
    entry = models.ForeignKey(BlogEntry, on_delete=models.CASCADE, verbose_name="Запись")
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Автор")
    parent_id = models.IntegerField(verbose_name="id родительского комментария")
    created_dt = models.DateTimeField(default=django.utils.timezone.now, verbose_name="Дата создания")


class EntryLikes(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Автор")
    entry = models.ForeignKey(BlogEntry, on_delete=models.CASCADE)


class CommentLikes(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Автор")
    comment = models.ForeignKey(BlogComment, on_delete=models.CASCADE)
