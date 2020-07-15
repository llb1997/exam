import xadmin
from xadmin import views


class GlobalSettings(object):
    site_title = '在线作业与考试系统'
    site_footer = '在线作业与考试'

xadmin.site.register(views.CommAdminView, GlobalSettings)